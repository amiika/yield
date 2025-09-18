
import type { MarchingObject, SceneObject, GLSLExpression, TurtleObject, Turtle3DObject } from '../../types';
import { isColorObject, isMatrix, toGLSL, transpileGLSL } from '../../utils';
import { glslLibrary } from './glsl-library';
import { createMarchingObject } from '../../utils';
export { toGLSL };

// --- Dependency Resolution ---

const getTopologicallySortedNames = (directDeps: Set<string>): string[] => {
    const sorted: string[] = [];
    const visited = new Set<string>();
    const tempMark = new Set<string>();

    const visit = (depName: string) => {
        if (visited.has(depName)) return;
        if (tempMark.has(depName)) {
            console.warn(`Circular dependency detected in GLSL library: ${depName}`);
            return;
        }

        const func = glslLibrary[depName];
        if (!func) return;

        tempMark.add(depName);
        func.dependencies.forEach(d => visit(d));
        tempMark.delete(depName);
        
        visited.add(depName);
        sorted.push(depName);
    };
    
    Array.from(directDeps).sort().forEach(visit);
    return sorted;
};

const getTransitiveDependencies = (roots: Set<string>): Set<string> => {
    const deps = new Set<string>();
    const toVisit = [...roots];
    while(toVisit.length > 0) {
        const current = toVisit.pop()!;
        if (deps.has(current)) continue;
        deps.add(current);
        const func = glslLibrary[current];
        if (func) {
            toVisit.push(...func.dependencies);
        }
    }
    return deps;
};

export const scanExpressionForDependencies = (expression: string, deps: Set<string>) => {
    if (!expression) return;
    for (const key in glslLibrary) {
        if (new RegExp(`\\b${key}\\b`).test(expression)) {
            deps.add(key);
        }
    }
};

export const resolveDependencies = (directDeps: Set<string>): string => {
    return getTopologicallySortedNames(directDeps)
        .map(name => glslLibrary[name]?.code)
        .filter(Boolean)
        .join('\n\n');
};


// --- GLSL Generation ---

const buildNodeList = (graph: MarchingObject): MarchingObject[] => {
    const list: MarchingObject[] = [];
    const visited = new Set<MarchingObject>();
    
    const visit = (node: MarchingObject) => {
        if (!node || visited.has(node)) return;
        visited.add(node);
        node.children.forEach(visit);
        list.push(node);
    };
    
    visit(graph);
    return list;
};

// Maps our operator names to the GLSL function names they require.
const combinatorOpToGLSLFunc = {
    union: 'opU', difference: 'opD', intersection: 'opI', xor: 'opXor',
    smoothUnion: 'opS', smoothDifference: 'opSS', smoothIntersection: 'opSI',
    pipe: 'opPipe', carve: 'opCarve', groove: 'opGroove', tongue: 'opTongue',
    stairsUnion: 'opStairs', stairsIntersection: 'opStairs', stairsDifference: 'opStairs'
};

const transformationOpToGLSLFunc = {
    translate: 'opTx',
    rotate: 'opRot', // Note: 'rotatesdf' operator creates a node with op: 'rotate'
    repeat: 'opRep',
    mirrorRepeat: 'opMirrorRepeat',
    limitedRepeat: 'opLimitedRepeat',
    rectangularRepeat: 'opRectangularRepeat',
    mirror: 'opMirror',
    mirrorX: 'opMirrorX',
    mirrorY: 'opMirrorY',
    mirrorZ: 'opMirrorZ',
    bend: 'opBend',
    twist: 'opTwist',
    elongate: 'opElongate',
};

// Ensures correct argument order for SDF primitives, as Object.values() is not reliable.
const sdfParamOrder = {
    // 3D
    sdPlane: ['normal', 'distance'], // sdPlane(p, n, h)
    sdCapsule: ['start', 'end', 'radius'], // sdCapsule(p, a, b, r)
    sdRoundbox: ['size', 'radius'], // sdRoundbox(p, b, r)
    sdCone: ['dimensions'],
    sdCylinder: ['dimensions'],
    sdHexprism: ['dimensions'],
    sdTriprism: ['dimensions'],
    sdTorus: ['radii'],
    sdTorus82: ['radii'],
    sdTorus88: ['radii'],
    sdMandelbox: ['scale', 'iterations', 'folding'],
    sdPathSDF: ['radius'],

    // 2D
    sdArc2d: ['sc', 'ra', 'rb'], // sdArc2d(p, sc, ra, rb)
    sdBox2d: ['size'],
    sdCircle2d: ['radius'],
    sdCross2d: ['size', 'radius'], // sdCross2d(p, b, r)
    sdEllipse2d: ['size'],
    sdEquilateralTriangle2d: ['radius'],
    sdHeart2d: [],
    sdHexagon2d: ['radius'],
    sdHexagram2d: ['radius'],
    sdIsoscelesTriangle2d: ['size'],
    sdMoon2d: ['d', 'ra', 'rb'], // sdMoon2d(p, d, ra, rb)
    sdOctogon2d: ['radius'],
    sdParallelogram2d: ['width', 'height', 'skew'], // sdParallelogram2d(p, wi, he, sk)
    sdPentagon2d: ['radius'],
    sdPie2d: ['c', 'radius'], // sdPie2d(p, c, r)
    sdRhombus2d: ['size'],
    sdRoundedbox2d: ['size', 'radii'], // sdRoundedbox2d(p, b, r)
    sdRoundedx2d: ['width', 'radius'], // sdRoundedx2d(p, w, r)
    sdSegment2d: ['a', 'b'],
    sdStar2d: ['radius', 'n', 'm'], // sdStar2d(p, r, n, m)
    sdTrapezoid2d: ['r1', 'r2', 'height'], // sdTrapezoid2d(p, r1, r2, he)
    sdTriangle2d: ['p0', 'p1', 'p2'],
    sdVesica2d: ['width', 'height'], // sdVesica2d(p, w, h)
    sdNgon2d: ['radius', 'n'], // sdNgon2d(p, r, n)
};

const transformationOpParamOrder = {
    rotate: ['axis', 'angle'], // opRot(p, axis, angle)
    scale: ['amount'],
    translate: ['amount'],
    repeat: ['spacing'],
    mirrorRepeat: ['spacing'],
    limitedRepeat: ['spacing', 'limits'],
    rectangularRepeat: ['size', 'spacing'],
    bend: ['amount'],
    twist: ['amount'],
    elongate: ['h'],
};

const processProps = (props: any, order: string[] | undefined, deps: Set<string>): string => {
    const propValues = order ? order.map(p => props[p]) : Object.values(props);
    propValues.forEach(val => {
        if (val?.type === 'glsl_expression') {
            scanExpressionForDependencies(val.code, deps);
        }
    });
    return propValues.map(toGLSL).join(', ');
};

export function buildSDFShaderParts(graph: MarchingObject) {
    const nodes = buildNodeList(graph);
    const nodeMap = new Map<MarchingObject, number>(nodes.map((n, i) => [n, i]));
    const directDeps = new Set<string>();
    const extraFunctions: string[] = [];
    const imageMaterialFunctions: string[] = [];
    
    const materialCases = nodes.map((node, i) => {
        const mat = node.material;

        if (mat?.type === 'image_material') {
            directDeps.add('getNormal'); // Tri-planar mapping needs normals
            const funcName = `image_material_${i + 1}`;
            const colorExpression = transpileGLSL(mat.quotation);
            scanExpressionForDependencies(colorExpression, directDeps);
            
            imageMaterialFunctions.push(`
vec4 ${funcName}(vec3 p, vec2 uv) {
    // p, t, etc are available here from the transpiler's special vars
    return ${colorExpression};
}`);
            
            return `
    if (matId == ${i + 1}) {
        vec3 n = abs(getNormal(p));
        n /= dot(n, vec3(1.0));
        vec4 color = vec4(0.0);
        color += ${funcName}(p, p.yz) * n.x;
        color += ${funcName}(p, p.xz) * n.y;
        color += ${funcName}(p, p.xy) * n.z;
        return color.xyz;
    }`;
        }
        
        const glslExpr = toGLSL(mat);
        scanExpressionForDependencies(glslExpr, directDeps);
        if (!glslExpr) {
            return `if (matId == ${i + 1}) return vec3(0.8);`;
        }
        return `if (matId == ${i + 1}) return ${glslExpr};`;
    }).join('\n    ');

    const getMaterialColorFunction = `
${imageMaterialFunctions.join('\n')}

vec3 getMaterialColor(int matId, float u_time, vec3 p) {
    if (matId == 0) return vec3(0.8);
    ${materialCases}
    return vec3(0.8);
}`;

    const mapFunctions = nodes.map((node, i) => {
        const children = node.children.map(c => nodeMap.get(c));
        let body = '';
        
        switch (node.type) {
            case 'geometry': {
                if (node.op === 'topology') {
                    directDeps.add('sdTriangle');
                    const vertices = node.props.vertices as number[][];
                    const indices = node.props.indices as number[][];

                    if (!vertices || !indices) {
                        body = 'return vec2(1e6, 0.0);'; // return empty space if data is missing
                        break;
                    }

                    const glslVertices = `const vec3 vertices[${vertices.length}] = vec3[](${vertices.map(v => `vec3(${v.map(toGLSL).join(', ')})`).join(', ')});`;
                    // Convert from 1-based to 0-based indices for GLSL array access
                    const glslIndices = `const ivec3 indices[${indices.length}] = ivec3[](${indices.map(idx => `ivec3(${idx.map(val => Math.floor(val) - 1).join(', ')})`).join(', ')});`;
                    
                    body = `
                        ${glslVertices}
                        ${glslIndices}
                        float min_dist = 1e6;
                        for (int j = 0; j < ${indices.length}; j++) {
                            ivec3 tri_indices = indices[j];
                            vec3 v0 = vertices[tri_indices.x];
                            vec3 v1 = vertices[tri_indices.y];
                            vec3 v2 = vertices[tri_indices.z];
                            min_dist = min(min_dist, sdTriangle(p, v0, v1, v2));
                        }
                        return vec2(min_dist, ${toGLSL(i + 1)});
                    `;
                    break;
                }
                const geomOp = node.op.charAt(0).toUpperCase() + node.op.slice(1);
                const funcName = `sd${geomOp}`;
                
                if (funcName === 'sdPathSDF') {
                    const pathExpr = node.props['path'];
                    if (pathExpr && pathExpr.type === 'glsl_expression') {
                        scanExpressionForDependencies(pathExpr.code, directDeps);
                        const pathCode = pathExpr.code.replace(/u_time/g, 't');
                         if (!extraFunctions.some(fn => fn.startsWith('vec3 path(float t)'))) {
                            extraFunctions.push(`vec3 path(float t) { return ${pathCode}; }`);
                        }
                        if (!extraFunctions.some(fn => fn.startsWith('float sdPathSDF'))) {
                            extraFunctions.push(`float sdPathSDF(vec3 p, float r) { vec3 path_pos = path(p.z); return length(p.xy - path_pos.xy) - r; }`);
                        }
                    }
                } else {
                    directDeps.add(funcName);
                }

                if (node.op.endsWith('2d')) {
                    directDeps.add('extrude');
                }
                const paramOrder = sdfParamOrder[funcName];
                const geomProps = processProps(node.props, paramOrder, directDeps);
                
                body = `return vec2(${funcName}(p${geomProps ? ', ' + geomProps : ''}), ${toGLSL(i + 1)});`;
                break;
            }
            case 'combinator': {
                const funcName = combinatorOpToGLSLFunc[node.op];
                if(funcName) directDeps.add(funcName);

                if (node.op.startsWith('round') || node.op.startsWith('chamfer')) {
                    directDeps.add('opRound');
                    directDeps.add(combinatorOpToGLSLFunc[node.op.replace('round', '').replace('chamfer', '').toLowerCase()] || 'opU');
                }
                
                const combProps = processProps(node.props, undefined, directDeps);
                const child1 = `map_${children[0]}(p)`;
                const child2 = `map_${children[1]}(p)`;

                let result;
                switch(node.op) {
                    case 'union': result = `opU(${child1}, ${child2})`; break;
                    case 'difference': result = `opD(${child1}, ${child2})`; break;
                    case 'intersection': result = `opI(${child1}, ${child2})`; break;
                    case 'xor': result = `opXor(${child1}, ${child2})`; break;
                    case 'smoothUnion': result = `opS(${child1}, ${child2}, ${combProps})`; break;
                    case 'smoothDifference': result = `opSS(${child1}, ${child2}, ${combProps})`; break;
                    case 'smoothIntersection': result = `opSI(${child1}, ${child2}, ${combProps})`; break;
                    case 'roundUnion': case 'chamferUnion': result = `opRound(opU(${child1}, ${child2}), ${combProps})`; break;
                    case 'roundIntersection': case 'chamferIntersection': result = `opRound(opI(${child1}, ${child2}), ${combProps})`; break;
                    case 'roundDifference': case 'chamferDifference': result = `opRound(opD(${child1}, ${child2}), ${combProps})`; break;
                    case 'pipe': result = `opPipe(${child1}, ${child2}, ${combProps})`; break;
                    case 'carve': result = `opCarve(${child1}, ${child2}, ${combProps})`; break;
                    case 'groove': result = `opGroove(${child1}, ${child2}, ${combProps})`; break;
                    case 'tongue': result = `opTongue(${child1}, ${child2}, ${combProps})`; break;
                    case 'stairsUnion': case 'stairsIntersection': case 'stairsDifference': result = `opStairs(${child1}, ${child2}, ${combProps})`; break;
                    default: result = `opU(${child1}, ${child2})`; break;
                }
                body = `return ${result};`;
                break;
            }
            case 'transformation': {
                if (node.op === 'transform') {
                    const matrix = node.props['matrix'];
                    if (matrix?.type === 'glsl_expression') {
                        // FIX: Changed 'deps' to 'directDeps' to match declared variable name.
                        scanExpressionForDependencies(matrix.code, directDeps);
                    }
                    const matrixGLSL = toGLSL(matrix);
                    
                    let isMat3 = false;
                    if (matrix?.type === 'glsl_expression') {
                        isMat3 = matrix.returnType === 'mat3';
                    } else if (isMatrix(matrix)) {
                        isMat3 = matrix.length === 3;
                    }

                    const transformedP = isMat3 
                        ? `inverse(${matrixGLSL}) * p` 
                        : `(inverse(${matrixGLSL}) * vec4(p, 1.0)).xyz`;

                    body = `return map_${children[0]}(${transformedP});`;
                    break;
                }

                if (node.op === 'polarRepeat') {
                    const count = toGLSL(node.props['count']);
                    // FIX: Changed 'deps' to 'directDeps' to match declared variable name.
                    scanExpressionForDependencies(count, directDeps);
                    const childId = children[0];
                    body = `
                        float angle = 6.2831853 / ${count};
                        float a = atan(p.y, p.x);
                        float r = length(p.xy);
                        a = mod(a + angle*0.5, angle) - angle*0.5;
                        vec3 p_rep = vec3(r * cos(a), r * sin(a), p.z);
                        return map_${childId}(p_rep);
                    `;
                    break;
                }
                
                const glslOpName = transformationOpToGLSLFunc[node.op];
                // FIX: Changed 'deps' to 'directDeps' to match declared variable name.
                if(glslOpName) directDeps.add(glslOpName);
                
                // FIX: Changed 'deps' to 'directDeps' to match declared variable name.
                const transProps = processProps(node.props, transformationOpParamOrder[node.op], directDeps);
                
                if (node.op === 'scale') {
                     body = `vec2 res = map_${children[0]}(p / ${transProps}); res.x *= ${transProps}; return res;`;
                     break;
                }
                
                const transformedP = `${glslOpName}(p${transProps ? ', ' + transProps : ''})`;
                body = `return map_${children[0]}(${transformedP});`;
                break;
            }
            case 'alteration': {
                const altGLSLOp = `op${node.op.charAt(0).toUpperCase() + node.op.slice(1)}`;
                // FIX: Changed 'deps' to 'directDeps' to match declared variable name.
                if(glslLibrary[altGLSLOp]) directDeps.add(altGLSLOp);

                // FIX: Changed 'deps' to 'directDeps' to match declared variable name.
                const altProps = processProps(node.props, undefined, directDeps);
                let currentSDF = `map_${children[0]}(p)`;

                if (node.op === 'halve') {
                    body = `return ${altGLSLOp}(${currentSDF}, p${altProps ? ', ' + altProps : ''});`;
                } else if (node.op === 'displace') {
                    body = `vec2 res = ${currentSDF}; res.x += ${altProps}; return res;`;
                } else {
                    body = `return ${altGLSLOp}(${currentSDF}${altProps ? ', ' + altProps : ''});`;
                }
                break;
            }
        }
        
        return `vec2 map_${i}(vec3 p) { ${body} }`;
    }).join('\n');
    
    const mapFunctionsWithExtras = [...extraFunctions, mapFunctions].join('\n\n');
    const mainMapFunction = `vec2 map(vec3 p) { return map_${nodes.length - 1}(p); }`;
    return { materialFunction: getMaterialColorFunction, mapFunctions: mapFunctionsWithExtras, mainMapFunction, directDeps };
}

export const generateImageShaderFromString = (mainImageCode: string): string => {
    return `#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_moused;
out vec4 fragColor;

${mainImageCode}

void main() {
    mainImage(fragColor, gl_FragCoord.xy);
}
`;
};

export const generateImageShaderFromQuotation = (quotation: any[]): string => {
    const directDeps = new Set<string>();
    const colorExpression = transpileGLSL(quotation);
    scanExpressionForDependencies(colorExpression, directDeps);
    const libCode = resolveDependencies(directDeps);

    return `#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_moused;
out vec4 fragColor;

${libCode}

void main() {
    vec2 p_coord = gl_FragCoord.xy;
    vec2 uv = p_coord / u_resolution.xy;
    fragColor = ${colorExpression};
}
`;
};

export const generateTurtleShader = (turtle: TurtleObject): string => {
    if (!turtle || !turtle.path || turtle.path.length === 0) {
        return `#version 300 es
precision highp float;
out vec4 fragColor;
void main() { fragColor = vec4(0.0, 0.0, 0.0, 0.0); }`;
    }

    const directDeps = new Set<string>(['sdRoundedSegment2D']);
    const libraryCode = resolveDependencies(directDeps);

    const segmentsGLSL = turtle.path.map((seg) => {
        const p1 = `vec2(${toGLSL(seg.x1)}, ${toGLSL(seg.y1)})`;
        const p2 = `vec2(${toGLSL(seg.x2)}, ${toGLSL(seg.y2)})`;
        const color = `vec3(${toGLSL(seg.color[0])}, ${toGLSL(seg.color[1])}, ${toGLSL(seg.color[2])})`;
        const penSize = toGLSL(seg.penSize * 0.5); // Pen size is radius

        return `
    {
        float d_seg = sdRoundedSegment2D(st, ${p1}, ${p2}, ${penSize});
        if (d_seg < d) {
            d = d_seg;
            finalColor = ${color};
        }
    }`;
    }).join('');

    const mainCode = `
void main() {
    vec2 st = gl_FragCoord.xy - u_resolution.xy / 2.0;
    st.y = -st.y; // Use Y-up coordinate system for turtle

    float d = 1e20;
    vec3 finalColor = vec3(1.0); // Background color (white)

    ${segmentsGLSL}

    float AA = 1.5 / u_resolution.y; // Anti-aliasing width
    float fill = 1.0 - smoothstep(-AA, AA, d);
    
    // Premultiplied alpha for correct blending in the canvas
    fragColor = vec4(finalColor * fill, fill);
}
    `;

    return `#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
out vec4 fragColor;

${libraryCode}

${mainCode}
`;
};


export const generate2dSDFShader = (graph: MarchingObject): string => {
    const { materialFunction, mapFunctions, mainMapFunction, directDeps } = buildSDFShaderParts(graph);
    const glslSDFLibrary = resolveDependencies(directDeps);

    const mainFunction = `
void main() {
    vec2 st = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
    vec3 p = vec3(st, 0.0);

    vec2 res = map(p);
    float dist = res.x;
    float matId = res.y;

    vec3 color = getMaterialColor(int(matId), u_time, p);
    
    // Antialiased fill
    float AA = 2.0 / u_resolution.y;
    float fill = 1.0 - smoothstep(-AA, AA, dist);
    
    // Premultiplied alpha
    fragColor = vec4(color * fill, fill);
}
    `;

    return `#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_moused;
out vec4 fragColor;

vec2 map(vec3 p);

${glslSDFLibrary}

${materialFunction}

${mapFunctions}

${mainMapFunction}

${mainFunction}
`;
};


export const generateMarchingShader = (scene: SceneObject, quality: number): string => {
    const { materialFunction, mapFunctions, mainMapFunction, directDeps } = buildSDFShaderParts(scene.graph);
    
    const iterations = scene.renderParams?.iterations ?? (quality * 10);
    const near = scene.renderParams?.near ?? 0.001;
    const far = scene.renderParams?.far ?? 100.0;
    
    scanExpressionForDependencies(toGLSL(scene.camera?.pos), directDeps);
    scanExpressionForDependencies(toGLSL(scene.camera?.target), directDeps);
    scene.lights.forEach(light => {
        scanExpressionForDependencies(toGLSL(light.pos), directDeps);
        scanExpressionForDependencies(toGLSL(light.color), directDeps);
    });
    scanExpressionForDependencies(toGLSL(scene.background), directDeps);
    scanExpressionForDependencies(toGLSL(scene.fog?.color), directDeps);
    scanExpressionForDependencies(toGLSL(scene.fog?.strength), directDeps);

    const postMapRoots = new Set<string>();
    if (scene.lights.length > 0) {
        postMapRoots.add('getNormal');
    }
    if (scene.shadow) {
        postMapRoots.add('calcSoftshadow');
    }
    if (scene.post && scene.post.length > 0) {
        scene.post.forEach(effect => directDeps.add(`post_${effect.op}`));
    }
    
    const postMapDeps = getTransitiveDependencies(postMapRoots);
    const preMapDeps = new Set<string>();

    for (const dep of directDeps) {
        if (!postMapDeps.has(dep)) {
            preMapDeps.add(dep);
        }
    }

    const preMapLibrary = resolveDependencies(preMapDeps);
    const postMapLibrary = resolveDependencies(postMapDeps);
    
    const camPos = scene.camera?.pos ? toGLSL(scene.camera.pos) : 'vec3(0.0, 0.0, 5.0)';
    const camTarget = scene.camera?.target ? toGLSL(scene.camera.target) : 'vec3(0.0, 0.0, 0.0)';
    
    let lightsDeclarations = scene.lights.map((light, i) => `
        vec3 lightPos_${i} = ${toGLSL(light.pos) || 'vec3(2.0, 2.0, 5.0)'};
        vec3 lightColor_${i} = ${toGLSL(light.color) || 'vec3(1.0)'};
        float lightAtten_${i} = ${toGLSL(light.attenuation) || '0.1'};
    `).join('');

    let lightingCalculation = scene.lights.map((_, i) => `
        {
            vec3 lightDir = normalize(lightPos_${i} - p);
            float dif = max(dot(nor, lightDir), 0.0);
            float spe = pow(max(dot(reflect(-rd, nor), lightDir), 0.0), 32.0);
            
            float shadowFactor = 1.0;
            ${scene.shadow ? `shadowFactor = calcSoftshadow(p + nor * 0.001, lightDir, ${toGLSL(scene.shadow.diffuseness)});` : ''}

            float dist = length(lightPos_${i} - p);
            float atten = 1.0 / (1.0 + lightAtten_${i} * dist * dist);

            col += matColor * lightColor_${i} * dif * shadowFactor * atten;
            col += spe * lightColor_${i} * shadowFactor * atten;
        }
    `).join('');
    
    let lightingBlock = '';
    if (scene.lights.length > 0) {
        lightingBlock = `
        vec3 nor = getNormal(p);
        ${lightingCalculation}
        `;
    } else {
        lightingBlock = `col = matColor;`;
    }

    let postProcessing = 'vec3 finalColor = col;';
    if(scene.post && scene.post.length > 0) {
        postProcessing = scene.post.reduce((acc, effect) => {
            const props = effect.props ? Object.values(effect.props).map(toGLSL).join(', ') : '';
            return `post_${effect.op}(${acc}, uv${props ? ', ' + props : ''})`;
        }, 'col');
        postProcessing = `vec3 finalColor = ${postProcessing};`;
    }

    const farStr = toGLSL(far);
    const nearStr = toGLSL(near);

    const mainFunction = `
void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = -1.0 + 2.0 * uv;
    p.x *= u_resolution.x / u_resolution.y;

    vec3 ro = ${camPos};
    vec3 ta = ${camTarget};
    vec3 ww = normalize(ta - ro);
    vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));
    vec3 vv = normalize(cross(uu, ww));
    vec3 rd = normalize(p.x * uu + p.y * vv + 1.5 * ww);

    float t = 0.0;
    vec2 d = vec2(1.0, 0.0);
    int matId = 0;
    for (int i = 0; i < ${iterations}; i++) {
        d = map(ro + rd * t);
        if (d.x < ${nearStr}) break;
        t += d.x;
        if (t > ${farStr}) break;
    }

    vec3 col = vec3(0.0);
    ${scene.background ? `col = ${toGLSL(scene.background)};` : ''}

    if (t < ${farStr}) {
        vec3 p = ro + rd * t;
        matId = int(d.y);
        vec3 matColor = getMaterialColor(matId, u_time, p);
        col = vec3(0.0); // Reset for lighting
        
        ${lightsDeclarations}
        
        ${lightingBlock}

        ${scene.fog ? `col = mix(col, ${toGLSL(scene.fog.color)}, 1.0 - exp(-${toGLSL(scene.fog.strength)}*t*t));` : ''}
    }
    
    ${postProcessing}
    fragColor = vec4(finalColor, 1.0);
}
    `;

    return `#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_moused;
out vec4 fragColor;

vec2 map(vec3 p);

${preMapLibrary}

${mapFunctions}

${mainMapFunction}

${postMapLibrary}

${materialFunction}

${mainFunction}
`;
};


export function generatePathShader(scene: SceneObject, path_expr: GLSLExpression, look_around_expr?: GLSLExpression): string {
    const { materialFunction, mapFunctions, mainMapFunction, directDeps } = buildSDFShaderParts(scene.graph);
    
    directDeps.add('getNormal');
    directDeps.add('calcSoftshadow');
    scanExpressionForDependencies(path_expr.code, directDeps);
    if (look_around_expr) {
        scanExpressionForDependencies(look_around_expr.code, directDeps);
    }
    
    const libCode = resolveDependencies(directDeps);
    const cameraSpeed = scene.camera?.speed ?? 1.0;
    
    const lightsDeclarations = scene.lights.map((light, i) => `
        vec3 lightPos_${i} = ${toGLSL(light.pos) || 'vec3(2.0, 2.0, 5.0)'};
        vec3 lightColor_${i} = ${toGLSL(light.color) || 'vec3(1.0)'};
        float lightAtten_${i} = ${toGLSL(light.attenuation) || '0.1'};
    `).join('');

    let lightingCalculation = scene.lights.map((_, i) => `
        {
            vec3 lightDir = normalize(lightPos_${i} - p);
            float dif = max(dot(nor, lightDir), 0.0);
            float spe = pow(max(dot(reflect(-rd, nor), lightDir), 0.0), 32.0);
            float shadowFactor = calcSoftshadow(p + nor * 0.001, lightDir, 8.0);
            float dist = length(lightPos_${i} - p);
            float atten = 1.0 / (1.0 + lightAtten_${i} * dist * dist);
            col += matColor * lightColor_${i} * dif * shadowFactor * atten;
            col += spe * lightColor_${i} * shadowFactor * atten;
        }
    `).join('');

    if (scene.lights.length === 0) {
        lightingCalculation = 'col = matColor;';
    }
    
    const mainFunction = `
vec3 path(float t) {
    return ${path_expr.code};
}
${look_around_expr ? `vec2 look_around(vec2 uv) { vec2 mouse_normalized = vec2(0.0); return ${look_around_expr.code}; }` : ''}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p_ndc = -1.0 + 2.0 * uv;
    p_ndc.x *= u_resolution.x / u_resolution.y;

    float t_path = u_time * ${toGLSL(cameraSpeed)};
    
    vec3 ro = path(t_path);
    vec3 target = path(t_path + 0.1);
    
    // Add an upward offset to camera for a "standing" view
    ro.y += 0.2;
    
    // Tunneling
    float tunnel = 1.0 - exp(-1.0 * map(ro).x);
    ro.y += tunnel * 2.0;

    vec3 fwd = normalize(target - ro);
    vec3 right = normalize(cross(fwd, vec3(0.0, 1.0, 0.0)));
    vec3 up = normalize(cross(right, fwd));

    // Apply look-around
    ${look_around_expr ? 'vec2 look = look_around(uv); target = ro + fwd + right * look.x - up * look.y; fwd = normalize(target - ro); right = normalize(cross(fwd, vec3(0.0, 1.0, 0.0))); up = normalize(cross(right, fwd));' : ''}
    
    vec3 rd = normalize(fwd + p_ndc.x * right + p_ndc.y * up);

    float t = 0.0;
    vec2 d = vec2(1.0, 0.0);
    int matId = 0;
    for (int i = 0; i < 80; i++) {
        vec3 p = ro + rd * t;
        d = map(p);
        d.x -= 0.1 * tunnel;
        if (d.x < 0.001) break;
        t += d.x * 0.8;
        if (t > 100.0) break;
    }

    vec3 col = vec3(0.0);
    if (t < 100.0) {
        vec3 p = ro + rd * t;
        matId = int(d.y);
        vec3 matColor = getMaterialColor(matId, u_time, p);
        col = vec3(0.0);
        
        ${lightsDeclarations}
        
        vec3 nor = getNormal(p);
        
        ${lightingCalculation}

        col = mix(col, vec3(0.0), 1.0 - exp(-0.01*t*t));
    }

    fragColor = vec4(col, 1.0);
}
`;

    return `#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_moused;
out vec4 fragColor;

vec2 map(vec3 p);

${libCode}

${mapFunctions}

${mainMapFunction}

${materialFunction}

${mainFunction}
`;
}

export function generateSceneFromTurtle3D(turtle: Turtle3DObject): SceneObject {
    if (!turtle || !turtle.path || turtle.path.length === 0) {
        return {
            type: 'scene',
            graph: createMarchingObject('sphere', 'geometry', [], { radius: -1.0 }), // empty scene
            lights: [],
        };
    }

    let sceneGraph: MarchingObject | undefined = undefined;

    for (const seg of turtle.path) {
        const p1 = seg.p1;
        const p2 = seg.p2;
        const color = seg.color;
        const penSize = seg.penSize * 0.05; // Scale pen size for 3D

        const capsuleSDF = createMarchingObject('capsule', 'geometry', [], {
            start: p1,
            end: p2,
            radius: penSize,
        });
        capsuleSDF.material = { type: 'color', expression: `vec3(${toGLSL(color[0])}, ${toGLSL(color[1])}, ${toGLSL(color[2])})`};

        if (sceneGraph) {
            sceneGraph = createMarchingObject('smoothUnion', 'combinator', [sceneGraph, capsuleSDF], { smoothness: penSize * 2.0 });
        } else {
            sceneGraph = capsuleSDF;
        }
    }

    return { type: 'scene', graph: sceneGraph!, lights: [] };
}