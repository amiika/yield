





import type { MarchingObject, SceneObject, GLSLExpression } from '../../types';
import { isColorObject, isMatrix, toGLSL, transpileGLSL } from '../../utils';
import { glslLibrary } from './glsl-library';
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
    pipe: 'opPipe', engrave: 'opEngrave', groove: 'opGroove', tongue: 'opTongue',
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
                    case 'engrave': result = `opEngrave(${child1}, ${child2}, ${combProps})`; break;
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
                if(glslOpName) directDeps.add(glslOpName);
                
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
                if(glslLibrary[altGLSLOp]) directDeps.add(altGLSLOp);

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

export const generate2dSDFShader = (graph: MarchingObject): string => {
    const { materialFunction, mapFunctions, mainMapFunction, directDeps } = buildSDFShaderParts(graph);
    const glslSDFLibrary = resolveDependencies(directDeps);

    const mainFunction = `
void main() {
    vec2 st = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
    vec3 p = vec3(st * (5.0 / 1.5), 0.0); // Scale to match the default 3D camera's perspective at z=0

    vec2 res = map(p);
    float dist = res.x;
    float matId = res.y;

    vec3 color = getMaterialColor(int(matId), u_time, p);
    
    // Antialiased fill
    float fill = 1.0 - smoothstep(0.0, 2.0 / u_resolution.y, dist);

    // Optional outline
    float outline = smoothstep(0.0, 4.0 / u_resolution.y, abs(dist)) - fill;

    vec3 finalColor = color * fill + vec3(0.2) * outline;

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
            float atten = 1.0 / (1.0 + dist * dist * lightAtten_${i});
            
            totalColor += (dif * matColor * shadowFactor + vec3(spe * 0.5)) * lightColor_${i} * atten;
        }
    `).join('') || 'totalColor = matColor * 0.5;';
    
    let postProcessingChain = '';
    if (scene.post && scene.post.length > 0) {
        postProcessingChain = `
    vec3 finalColor = col;
    ${scene.post.map((effect) => {
        const props = processProps(effect.props, undefined, directDeps);
        return `finalColor = post_${effect.op}(finalColor, st${props ? ', ' + props : ''});`;
    }).join('\n    ')}
        `;
    }

    return `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_moused;

out vec4 fragColor;

vec2 map(vec3 p);

${preMapLibrary}

// Material Definitions
${materialFunction}

// Scene Definition
${mapFunctions}
${mainMapFunction}

${postMapLibrary}

vec3 render(vec3 ro, vec3 rd, float u_time) {
    float t = 0.0;
    vec3 col = ${toGLSL(scene.background) || 'vec3(0.0)'};
    
    for (int i = 0; i < ${Math.floor(iterations)}; i++) {
        vec3 p = ro + rd * t;
        vec2 d = map(p);
        
        if (d.x < ${toGLSL(near)}) {
            vec3 nor = vec3(0.0);
            ${scene.lights.length > 0 ? 'nor = getNormal(p);' : ''}
            vec3 matColor = getMaterialColor(int(d.y), u_time, p);
            vec3 totalColor = vec3(0.0);
            
            ${lightsDeclarations}
            ${lightingCalculation}

            col = totalColor;
            break;
        }
        
        if (t > ${toGLSL(far)}) {
            break;
        }
        t += d.x;
    }

    ${scene.fog ? `
        float fogAmount = 1.0 - exp(-t * (${toGLSL(scene.fog.strength) || '0.1'}));
        col = mix(col, ${toGLSL(scene.fog.color) || 'vec3(0.5)'}, fogAmount);
    ` : ''}

    return col;
}

void main() {
    vec2 st = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
    
    vec3 ro = ${camPos};
    vec3 ta = ${camTarget};
    
    vec3 ww = normalize(ta - ro);
    vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));
    vec3 vv = cross(uu, ww);
    vec3 rd = normalize(st.x * uu + st.y * vv + 1.5 * ww);
    
    vec3 col = render(ro, rd, u_time);

    ${postProcessingChain}
    
    fragColor = vec4(${scene.post && scene.post.length > 0 ? 'finalColor' : 'col'}, 1.0);
}
`;
}

export function generatePathShader(scene: SceneObject, pathQuotation: GLSLExpression, lookAroundQuotation?: GLSLExpression): string {
    const { materialFunction, mapFunctions, mainMapFunction, directDeps } = buildSDFShaderParts(scene.graph);
    scanExpressionForDependencies(pathQuotation.code, directDeps);
    directDeps.add('opSS'); // Use smooth difference

    const postMapRoots = new Set<string>();
    const postMapDeps = getTransitiveDependencies(postMapRoots);
    const preMapDeps = new Set<string>();
    for (const dep of directDeps) {
        if (!postMapDeps.has(dep)) {
            preMapDeps.add(dep);
        }
    }

    const preMapLibrary = resolveDependencies(preMapDeps);
    const postMapLibrary = resolveDependencies(postMapDeps);

    const pathFunctionBody = pathQuotation.code.replace(/u_time/g, 't');
    const iterations = scene.renderParams?.iterations ?? 128;
    const near = scene.renderParams?.near ?? 0.001;
    const far = scene.renderParams?.far ?? 50.0;

    let rd_calculation = `vec3 rd = normalize(uv.x * uu + uv.y * vv + 1.5 * ww);`;
    if (lookAroundQuotation) {
        scanExpressionForDependencies(lookAroundQuotation.code, directDeps);
        rd_calculation = `
    vec2 look = ${lookAroundQuotation.code};
    vec3 rd = normalize((uv.x + look.x * 0.5) * uu + (uv.y - look.y * 0.5) * vv + 1.5 * ww);`;
    }
    
    return `#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_moused;
out vec4 fragColor;

vec2 map(vec3 p);
vec2 map_combined(vec3 p, float time);

${preMapLibrary}
${materialFunction}
${mapFunctions}
${mainMapFunction}
${postMapLibrary}

// --- Path Function (from user quotation) ---
vec3 path(float t) {
    return ${pathFunctionBody};
}

// The main Signed Distance Function that combines the world and the track.
vec2 map_combined(vec3 p, float time) {
    vec2 world_res = map(p);

    // Iteratively find a better estimate for t on the path closest to p
    float t_est = time;
    for(int i=0; i<4; i++) {
        vec3 path_pos = path(t_est);
        vec3 path_tangent = normalize(path(t_est + 0.01) - path_pos);
        float proj = dot(p - path_pos, path_tangent);
        t_est += proj * 0.5; // Move halfway to the projected point
    }

    vec3 closest_point = path(t_est);

    // SDF for a circular tunnel around the path
    float tunnel_radius = 0.8;
    float tunnel_dist = length(p - closest_point) - tunnel_radius;
    vec2 tunnel_res = vec2(tunnel_dist, -1.0); // Tunnel has no material

    // Subtract the tunnel from the world.
    return opSS(tunnel_res, world_res, 0.2);
}

vec3 getNormalTour(vec3 p, float time) {
    vec2 e = vec2(0.001, 0.0);
    return normalize(vec3(
        map_combined(p + e.xyy, time).x - map_combined(p - e.xyy, time).x,
        map_combined(p + e.yxy, time).x - map_combined(p - e.yxy, time).x,
        map_combined(p + e.yyx, time).x - map_combined(p - e.yyx, time).x
    ));
}

vec3 trace(vec3 ro, vec3 rd, float time) {
    float t = 0.0;
    for (int i = 0; i < ${Math.floor(iterations)}; i++) {
        vec3 p = ro + t * rd;
        vec2 res = map_combined(p, time);
        float d = res.x;
        if (d < ${toGLSL(near)}) {
            // Get material color from user's SDF definitions
            vec3 matColor = getMaterialColor(int(res.y), u_time, p);

            // --- Simple Headlight Lighting (Ambient + Diffuse) ---
            vec3 nor = getNormalTour(p, time);
            vec3 lightPos = ro + vec3(0.0, 0.2, 0.5); // Headlight attached to camera
            vec3 lightDir = normalize(lightPos - p);
            
            float dif = max(dot(nor, lightDir), 0.0);
            vec3 ambient = vec3(0.2);
            vec3 lighting = ambient + matColor * dif;
            
            return lighting;
        }
        if (t > ${toGLSL(far)}) break;
        t += d * 0.5;
    }

    return vec3(0.0, 0.0, 0.05); // Background color
}

void main() {
    vec2 uv = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
    float time = u_time * 0.5;
    
    vec3 ro = path(time);
    vec3 ta = path(time + 0.1);

    vec3 ww = normalize(ta - ro);
    vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));
    vec3 vv = cross(uu, ww);
    ${rd_calculation}

    vec3 col = trace(ro, rd, time);
    fragColor = vec4(col, 1.0);
}
`;
}