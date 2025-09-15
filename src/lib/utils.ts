// --- Utility Helpers ---
import type { MarchingObject, ColorObject, GLSLExpression } from './types';

export const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const deepClone = (obj) => {
    try {
        // The modern, fast, and robust way to deep-clone
        return structuredClone(obj);
    } catch (e) {
        // Fallback for environments where structuredClone is not available.
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        if (obj instanceof Array) {
            return obj.map(deepClone);
        }
        if (obj.constructor === Object) {
            const newObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    newObj[key] = deepClone(obj[key]);
                }
            }
            return newObj;
        }
        return obj; 
    }
};

export const isMatrix = (v: any): boolean => {
    if (!Array.isArray(v)) return false;
    if (v.length === 0) return true; // An empty list is a 0-row matrix.

    const firstRow = v[0];
    if (!Array.isArray(firstRow)) return false;

    const cols = firstRow.length;
    // Every row must be an array with the same length as the first row.
    return v.every(row => Array.isArray(row) && row.length === cols);
};

export const isFlatList = (v: any): boolean => Array.isArray(v) && !isMatrix(v);

// The generic formatter for converting any Yield value into its parsable code representation.
export const yieldFormatter = (value: any): string => {
    if (typeof value === 'string') {
        // The parser prefixes literal strings with \0.
        // To make it valid code again, we must wrap the content in quotes.
        if (value.startsWith('\0')) {
            return `"${value.slice(1)}"`;
        }
        // Otherwise, it's an operator/word, which shouldn't be quoted.
        return value;
    }
    if (Array.isArray(value)) {
        // A list is a quotation; valid code requires parentheses.
        return `(${value.map(yieldFormatter).join(' ')})`;
    }
    if (value === true) return 'true';
    if (value === false) return 'false';
    if (typeof value === 'object' && value !== null) {
        // For complex objects, provide a readable but not necessarily parsable representation.
        if (value.type === 'until-process') {
            const { quotation, intervalBeats, endBeats } = value;
            return `(${yieldFormatter(quotation)} ${intervalBeats} ${endBeats} until)`;
        }
        if (value.type === 'until-def') {
            if (Array.isArray(value.sourceCode)) {
                return yieldFormatter(value.sourceCode);
            }
            const { initialValue, quotation, intervalBeats, endBeats } = value;
            return `(${yieldFormatter(initialValue)} ${yieldFormatter(quotation)} ${intervalBeats} ${endBeats} until)`;
        }
        if (value.type === 'live-loop-def') {
            if (Array.isArray(value.sourceCode)) {
                return yieldFormatter(value.sourceCode);
            }
            if (Array.isArray(value.quotation) && typeof value.beatValue === 'number') {
                const quotationString = yieldFormatter(value.quotation);
                return `(${quotationString} ${value.beatValue} live)`;
            }
            return '<live-loop>';
        }
        if (value.type === 'shader') return '<shader>';
        if (value.type === 'scene') return '<scene>';
        if (value.type === 'light') return '<light>';
        if (value.type === 'color') return '<color>';
        if (value.type === 'glsl_expression') return '<glsl_expression>';
        if (value.type === 'postEffect') return `<${value.op} effect>`;
        if (['geometry', 'combinator', 'transformation', 'alteration'].includes(value.type)) return '<sdf>';
    }
    if (typeof value === 'symbol') {
        const key = Symbol.keyFor(value);
        if (key !== undefined) {
            return `:${key}`;
        }
        return value.toString();
    }
    return String(value);
};


// Helper function for recursive, element-wise binary operations
export const applyBinaryOp = (op: (a: number, b: number) => number | null, a: any, b: any): any => {
    // Case 1: scalar op scalar
    if (typeof a === 'number' && typeof b === 'number') {
        const result = op(a, b);
        if (result === null) {
            return null;
        }
        return result;
    }

    // Case 2: list/matrix op scalar (broadcasting)
    if (Array.isArray(a) && typeof b === 'number') {
        return a.map((val: any) => applyBinaryOp(op, val, b));
    }
    if (typeof a === 'number' && Array.isArray(b)) {
        return b.map((val: any) => applyBinaryOp(op, a, val));
    }

    // Case 3: list/matrix op list/matrix (sideways/outer-product)
    if (Array.isArray(a) && Array.isArray(b)) {
        const results: any[] = [];
        for (const itemA of a) {
            for (const itemB of b) {
                const result = applyBinaryOp(op, itemA, itemB);
                // The results of the inner operations might be lists themselves.
                // These must be flattened into the main result list.
                if (Array.isArray(result)) {
                    results.push(...result);
                } else {
                    results.push(result);
                }
            }
        }
        return results;
    }
    
    throw new Error(`Incompatible types for binary math operation: ${yieldFormatter(a)} and ${yieldFormatter(b)}`);
};


// --- SDF Helpers ---
export const isMarchingObject = (v: any): v is MarchingObject => v && typeof v === 'object' && ['geometry', 'combinator', 'transformation', 'alteration'].includes(v.type);

export const createMarchingObject = (op: string, type: MarchingObject['type'], children: MarchingObject[], props: any = {}): MarchingObject => ({
    op,
    type,
    children,
    props,
});

// --- Color Object Helper ---
export const isColorObject = (v: any): v is ColorObject => v && typeof v === 'object' && v.type === 'color';

// --- Material Presets ---
const materialPresets = {
    "red": [1.0, 0.2, 0.2],
    "green": [0.2, 1.0, 0.2],
    "blue": [0.2, 0.2, 1.0],
    "yellow": [1.0, 1.0, 0.2],
    "cyan": [0.2, 1.0, 1.0],
    "magenta": [1.0, 0.2, 1.0],
    "white": [1.0, 1.0, 1.0],
    "black": [0.0, 0.0, 0.0],
    "gray": [0.5, 0.5, 0.5],
    "orange": [1.0, 0.5, 0.0],
    "purple": [0.5, 0.0, 1.0],
    "teal": [0.0, 0.5, 0.5],
};

// --- GLSL Conversion Utility ---
export const toGLSL = (val: any): string => {
    if (val?.type === 'glsl_expression') {
        return val.code;
    }
    if (isColorObject(val)) {
        return val.expression;
    }
    if (typeof val === 'number') {
        const s = val.toString();
        if (Number.isInteger(val) && !s.includes('e') && !s.includes('.')) {
            return s + '.0';
        }
        return s;
    }
    if (typeof val === 'symbol') {
        const key = Symbol.keyFor(val);
        if (key && materialPresets[key]) {
            return toGLSL(materialPresets[key]);
        }
    }
    if (typeof val === 'string') {
        if (materialPresets[val]) {
            return toGLSL(materialPresets[val]);
        }
        return val;
    }
    if (Array.isArray(val)) {
        if (isMatrix(val)) {
            const mat = val as any[][];
            const rows = mat.length;
            if (rows === 0) return '';
            const cols = mat[0].length;
            if (rows !== cols) return ''; // Only square matrices for now
            const flat = mat.flat();
            if (rows === 3) return `mat3(${flat.map(v => toGLSL(v)).join(', ')})`;
            if (rows === 4) return `mat4(${flat.map(v => toGLSL(v)).join(', ')})`;
            return '';
        }
        if (val.length === 2) return `vec2(${val.map(toGLSL).join(', ')})`;
        if (val.length === 3) return `vec3(${val.map(toGLSL).join(', ')})`;
        if (val.length === 4) return `vec4(${val.map(toGLSL).join(', ')})`;
    }
    return '';
};

// --- Transpiler for Bytebeat, Floatbeat, and GLSL Quotations ---

const jsOpMap = {
    // Math
    '+': (b, a) => `(${a} + ${b})`,
    '-': (b, a) => `(${a} - ${b})`,
    '*': (b, a) => `(${a} * ${b})`,
    '/': (b, a) => `(${a} / ${b})`,
    '%': (b, a) => `(${a} % ${b})`,
    // Bitwise
    '>>': (b, a) => `(${a} >> ${b})`,
    '<<': (b, a) => `(${a} << ${b})`,
    '&': (b, a) => `(${a} & ${b})`,
    '|': (b, a) => `(${a} | ${b})`,
    '^': (b, a) => `(${a} ^ ${b})`,
    '~': (a) => `(~${a})`,
    // JS Math
    'sin': (a) => `Math.sin(${a})`,
    'cos': (a) => `Math.cos(${a})`,
    'tan': (a) => `Math.tan(${a})`,
    'pow': (b, a) => `Math.pow(${a}, ${b})`,
    'sqrt': (a) => `Math.sqrt(${a})`,
    'abs': (a) => `Math.abs(${a})`,
    'floor': (a) => `Math.floor(${a})`,
    'ceil': (a) => `Math.ceil(${a})`,
    'round': (a) => `Math.round(${a})`,
    'clamp': (c, b, a) => `Math.max(${b}, Math.min(${c}, ${a}))`,
    // Relational (return 1 or 0)
    '>': (b, a) => `((${a} > ${b}) ? 1 : 0)`,
    '<': (b, a) => `((${a} < ${b}) ? 1 : 0)`,
    '>=': (b, a) => `((${a} >= ${b}) ? 1 : 0)`,
    '<=': (b, a) => `((${a} <= ${b}) ? 1 : 0)`,
    '==': (b, a) => `((${a} === ${b}) ? 1 : 0)`,
    '!=': (b, a) => `((${a} !== ${b}) ? 1 : 0)`,
    '?': (c, b, a) => `(${a} ? ${b} : ${c})`, // RPN: A B C -> A ? B : C
    'ifte': (c, b, a) => `(${a} ? ${b} : ${c})`,
};

const jsArityMap = {
    // Math
    '+': 2, '-': 2, '*': 2, '/': 2, '%': 2,
    // Bitwise
    '>>': 2, '<<': 2, '&': 2, '|': 2, '^': 2,
    '~': 1,
    // JS Math
    'sin': 1, 'cos': 1, 'tan': 1, 'pow': 2, 'sqrt': 1, 'abs': 1,
    'floor': 1, 'ceil': 1, 'round': 1, 'clamp': 3,
    // Relational
    '>': 2, '<': 2, '>=': 2, '<=': 2, '==': 2, '!=': 2,
    '?': 3,
    'ifte': 3,
};

// Helper for GLSL transpilation to convert float values used as booleans
const boolifyGLSL = (expr: string): string => {
    // These are known float uniforms that are used as booleans
    if (expr === 'u_moused.z') {
        return `(${expr} > 0.5)`;
    }
    // A simple regex to check if it's a number literal like 1.0 or 0.0
    if (/^-?\d+(\.\d*)?$/.test(expr)) {
        return `(${expr} != 0.0)`;
    }
    return expr;
};

const glslOpMap = {
    // Math (RPN: A B -> op -> (A op B))
    '+': (b, a) => `(${a} + ${b})`,
    '-': (b, a) => `(${a} - ${b})`,
    '*': (b, a) => `(${a} * ${b})`,
    '/': (b, a) => `(${a} / ${b})`,
    '%': (b, a) => `mod(${a}, ${b})`,
    // Relational (RPN: A B -> op -> (A op B))
    '>': (b, a) => `(${a} > ${b})`,
    '<': (b, a) => `(${a} < ${b})`,
    '>=': (b, a) => `(${a} >= ${b})`,
    '<=': (b, a) => `(${a} <= ${b})`,
    '==': (b, a) => `(${a} == ${b})`,
    '!=': (b, a) => `(${a} != ${b})`,
    // Ternary - RPN: B T F -> ? -> B ? T : F
    '?': (c, b, a) => `(${boolifyGLSL(a)} ? ${b} : ${c})`,
    'ifte': (c, b, a) => `(${boolifyGLSL(a)} ? ${b} : ${c})`,
    // GLSL built-ins
    'sin': (a) => `sin(${a})`,
    'cos': (a) => `cos(${a})`,
    'tan': (a) => `tan(${a})`,
    'exp': (a) => `exp(${a})`,
    'pow': (b, a) => `pow(${a}, ${b})`,
    'sqrt': (a) => `sqrt(${a})`,
    'abs': (a) => `abs(${a})`,
    'neg': (a) => `(-${a})`,
    'floor': (a) => `floor(${a})`,
    'ceil': (a) => `ceil(${a})`,
    'round': (a) => `round(${a})`,
    'snoise': (a) => `snoise(${a})`,
    'fbm': (a) => `fbm(${a})`,
    'curl': (a) => `curl(${a})`,
    'fuse': (c, b, a) => `mix(${a}, ${b}, ${c})`, // RPN: A B T -> GLSL: mix(A, B, T)
    'clamp': (c, b, a) => `clamp(${a}, ${b}, ${c})`, // RPN: X Min Max -> GLSL: clamp(X, Min, Max)
    'smoothstep': (c, b, a) => `smoothstep(${b}, ${c}, ${a})`, // RPN: X E0 E1 -> GLSL: smoothstep(E0, E1, X)
    'cnoise': a => `cnoise(${a})`,
    'dot': (b, a) => `dot(${a}, ${b})`,
    'fract': (a) => `fract(${a})`,
    'length': (a) => `length(${a})`,
    'rotate': (c, b, a) => `opRot(${a}, ${b}, ${c})`, // RPN: P Axis Angle -> opRot(P, Axis, Angle)
    'translate': (b, a) => `opTx(${a}, ${b})`, // RPN: P Amount -> opTx(P, Amount)
    'juliaset': (c, b, a) => `juliaSDF(${a}, ${b}, ${c})`, // RPN: st c r -> juliaSDF(st, c, r)
    'mandelbrotSDF': (b, a) => `mandelbrotSDF(${a}, ${b})`, // RPN: st r -> mandelbrotSDF(st, r)
    'mandelbrotset': (b, a) => `mandelbrotSDF(${a}, ${b})`, // RPN: st r -> mandelbrotSDF(st, r)
    // Vector constructors
    'vec2': (b, a) => `vec2(${a}, ${b})`, // RPN: X Y -> GLSL: vec2(X,Y)
    'vec3': (c, b, a) => `vec3(${a}, ${b}, ${c})`, // RPN: X Y Z -> GLSL: vec3(X,Y,Z)
    'vec4': (d, c, b, a) => `vec4(${a}, ${b}, ${c}, ${d})`, // RPN: X Y Z W -> GLSL: vec4(X,Y,Z,W)
    'hsv': (c, b, a) => `hsv2rgb(vec3(${a}, ${b}, ${c}))`, // RPN: H S V -> hsv(H,S,V)
    // Distance Functions
    'distEuclidean': (b, a) => `distEuclidean(${a}, ${b})`,
    'distManhattan': (b, a) => `distManhattan(${a}, ${b})`,
    'distChebychev': (b, a) => `distChebychev(${a}, ${b})`,
    'distMinkowski': (c, b, a) => `distMinkowski(${a}, ${b}, ${c})`, // RPN: A B P -> dist(A, B, P)
    // --- 2D SDFs & Combinators (for image shaders) ---
    'worley': (a) => `worley(${a})`,
    'arc2d': (d, c, b, a) => `sdArc2d(${a}, ${b}, ${c}, ${d})`,
    'box2d': (b, a) => `sdBox2d(${a}, ${b})`,
    'circle2d': (b, a) => `sdCircle2d(${a}, ${b})`,
    'cross2d': (c, b, a) => `sdCross2d(${a}, ${b}, ${c})`,
    'ellipse2d': (b, a) => `sdEllipse2d(${a}, ${b})`,
    'equilateralTriangle2d': (b, a) => `sdEquilateralTriangle2d(${a}, ${b})`,
    'heart2d': (a) => `sdHeart2d(${a})`,
    'hexagon2d': (b, a) => `sdHexagon2d(${a}, ${b})`,
    'hexagram2d': (b, a) => `sdHexagram2d(${a}, ${b})`,
    'isoscelesTriangle2d': (b, a) => `sdIsoscelesTriangle2d(${a}, ${b})`,
    'moon2d': (d, c, b, a) => `sdMoon2d(${a}, ${b}, ${c}, ${d})`,
    'octogon2d': (b, a) => `sdOctogon2d(${a}, ${b})`,
    'parallelogram2d': (d, c, b, a) => `sdParallelogram2d(${a}, ${b}, ${c}, ${d})`,
    'pentagon2d': (b, a) => `sdPentagon2d(${a}, ${b})`,
    'pie2d': (c, b, a) => `sdPie2d(${a}, ${b}, ${c})`,
    'rhombus2d': (b, a) => `sdRhombus2d(${a}, ${b})`,
    'roundedbox2d': (c, b, a) => `sdRoundedbox2d(${a}, ${b}, ${c})`,
    'roundedx2d': (c, b, a) => `sdRoundedx2d(${a}, ${b}, ${c})`,
    'segment2d': (c, b, a) => `sdSegment2d(${a}, ${b}, ${c})`,
    'star2d': (d, c, b, a) => `sdStar2d(${a}, ${b}, ${c}, ${d})`,
    'trapezoid2d': (d, c, b, a) => `sdTrapezoid2d(${a}, ${b}, ${c}, ${d})`,
    'triangle2d': (d, c, b, a) => `sdTriangle2d(${a}, ${b}, ${c}, ${d})`,
    'vesica2d': (c, b, a) => `sdVesica2d(${a}, ${b}, ${c})`,
    'shape': (c, b, a) => `sdNgon2d(${a}, ${c}, ${b})`, // p, r, n -> a=p, b=n, c=r -> sdNgon2d(p,r,n)
    'union': (b, a) => `min(${a}, ${b})`,
    'difference': (b, a) => `max(${a}, -${b})`,
    'intersection': (b, a) => `max(${a}, ${b})`,
};

const glslArityMap = {
    // Math
    '+': 2, '-': 2, '*': 2, '/': 2, '%': 2,
    // Relational
    '>': 2, '<': 2, '>=': 2, '<=': 2, '==': 2, '!=': 2,
    // Ternary
    '?': 3,
    'ifte': 3,
    // GLSL built-ins
    'sin': 1, 'cos': 1, 'tan': 1, 'exp': 1, 'pow': 2, 'sqrt': 1, 'abs': 1, 'neg': 1,
    'floor': 1, 'ceil': 1, 'round': 1,
    'snoise': 1,
    'fbm': 1,
    'curl': 1,
    'fuse': 3,
    'clamp': 3,
    'smoothstep': 3,
    'cnoise': 1,
    'dot': 2,
    'fract': 1,
    'length': 1,
    'rotate': 3,
    'translate': 2,
    'juliaset': 3,
    'mandelbrotSDF': 2,
    'mandelbrotset': 2,
    // Vector constructors
    'vec2': 2, 'vec3': 3, 'vec4': 4,
    'hsv': 3,
    // Distance Functions
    'distEuclidean': 2,
    'distManhattan': 2,
    'distChebychev': 2,
    'distMinkowski': 3,
    // --- 2D SDFs & Combinators (for image shaders) ---
    'worley': 1,
    'arc2d': 4,
    'box2d': 2,
    'circle2d': 2,
    'cross2d': 3,
    'ellipse2d': 2,
    'equilateralTriangle2d': 2,
    'heart2d': 1,
    'hexagon2d': 2,
    'hexagram2d': 2,
    'isoscelesTriangle2d': 2,
    'moon2d': 4,
    'octogon2d': 2,
    'parallelogram2d': 4,
    'pentagon2d': 2,
    'pie2d': 3,
    'rhombus2d': 2,
    'roundedbox2d': 3,
    'roundedx2d': 3,
    'segment2d': 3,
    'star2d': 4,
    'trapezoid2d': 4,
    'triangle2d': 4,
    'vesica2d': 3,
    'shape': 3,
    'union': 2,
    'difference': 2,
    'intersection': 2,
};

export const transpileQuotation = (quotation: any[], opMap: any, arityMap: any, specialVars: Set<string>, isGLSLTarget: boolean): string => {
    const stack: string[] = [];
    const program = [...quotation]; // Make a copy

    const isSimpleVar = (s: string) => /^[a-zA-Z_][a-zA-Z0-9_]*(\.[xyzw]{1,4})*$/.test(s);
    const isAlreadyParenthesized = (s: string) => s.startsWith('(') && s.endsWith(')');

    while (program.length > 0) {
        // Lookahead for the `( ... ) glsl` pattern to handle it as a single unit.
        if (
            isGLSLTarget &&
            program.length > 1 &&
            Array.isArray(program[0]) &&
            program[1] === 'glsl'
        ) {
            const quotationToken = program.shift() as any[]; // consume quotation
            program.shift(); // consume 'glsl'
            const result = transpileQuotation(quotationToken, opMap, arityMap, specialVars, isGLSLTarget);
            stack.push(result);
            continue;
        }
        
        const token = program.shift();

        if (token?.type === 'glsl_expression') {
            stack.push(token.code);
            continue;
        }
        if (Array.isArray(token)) {
            // It's a nested quotation that is NOT a glsl expression.
            const result = transpileQuotation(token, opMap, arityMap, specialVars, isGLSLTarget);
            stack.push(`(${result})`);
            continue;
        }
        if (typeof token === 'number') {
            stack.push(isGLSLTarget ? toGLSL(token) : String(token));
            continue;
        }

        if (typeof token === 'string') {
            if (specialVars.has(token)) {
                let mappedToken = token;
                if (isGLSLTarget) {
                    if (token === 't') mappedToken = 'u_time';
                    if (token === 'mouse') mappedToken = 'u_mouse.xy';
                    if (token === 'mousex') mappedToken = 'u_mouse.x';
                    if (token === 'mousey') mappedToken = 'u_mouse.y';
                    if (token === 'moused') mappedToken = 'u_moused.xy';
                    if (token === 'mousedx') mappedToken = 'u_moused.x';
                    if (token === 'mousedy') mappedToken = 'u_moused.y';
                    if (token === 'moused?') mappedToken = 'u_moused.z';
                    if (token === 'width') mappedToken = 'u_resolution.x';
                    if (token === 'height') mappedToken = 'u_resolution.y';
                    if (token === 'uv') mappedToken = '(gl_FragCoord.xy / u_resolution.xy)';
                }
                stack.push(mappedToken);
                continue;
            }

            if (token === 'vec4') {
                // Custom handling for vec4 to support GLSL constructor overloads
                const op = opMap[token];
                const arity = arityMap[token];
                if (stack.length >= arity) { // Prioritize 4-float constructor
                    const args = [];
                    for(let i=0; i<arity; i++) args.push(stack.pop());
                    stack.push(op(...args));
                } else if (stack.length === 3) {
                    const c = stack.pop();
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(`vec4(${a}, ${b}, ${c})`);
                } else if (stack.length === 2) {
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(`vec4(${a}, ${b})`);
                } else if (stack.length === 1) {
                    const a = stack.pop();
                    stack.push(`vec4(${a})`);
                } else {
                    throw new Error(`Stack underflow for operator in quotation: 'vec4'.`);
                }
                continue;
            }

            // --- Transpiler-level stack manipulation ---
            if (token === 'dup') {
                if (stack.length < 1) throw new Error(`Stack underflow for 'dup' in quotation.`);
                stack.push(stack[stack.length - 1]);
                continue;
            }
            if (token === 'dupd') {
                if (stack.length < 2) throw new Error(`Stack underflow for 'dupd' in quotation.`);
                const y = stack.pop();
                const x = stack[stack.length - 1];
                stack.push(x, y);
                continue;
            }
            if (token === 'over') {
                if (stack.length < 2) throw new Error(`Stack underflow for 'over' in quotation.`);
                stack.push(stack[stack.length - 2]);
                continue;
            }
            if (token === 'swap') {
                if (stack.length < 2) throw new Error(`Stack underflow for 'swap' in quotation.`);
                const b = stack.pop();
                const a = stack.pop();
                stack.push(b, a);
                continue;
            }
            if (token === 'swapd') {
                if (stack.length < 3) throw new Error(`Stack underflow for 'swapd' in quotation.`);
                const c = stack.pop();
                const b = stack.pop();
                const a = stack.pop();
                stack.push(b, a, c);
                continue;
            }
            if (token === 'tuck') {
                if (stack.length < 2) throw new Error(`Stack underflow for 'tuck' in quotation.`);
                const y = stack.pop();
                const x = stack.pop();
                stack.push(y, x, y);
                continue;
            }
            if (token === 'rolldown') {
                if (stack.length < 3) throw new Error(`Stack underflow for 'rolldown' in quotation.`);
                const z = stack.pop();
                const y = stack.pop();
                const x = stack.pop();
                stack.push(y, z, x);
                continue;
            }
            if (token === 'rollup') {
                if (stack.length < 3) throw new Error(`Stack underflow for 'rollup' in quotation.`);
                const z = stack.pop();
                const y = stack.pop();
                const x = stack.pop();
                stack.push(z, x, y);
                continue;
            }
            if (token === 'rotate') {
                if (stack.length < 3) throw new Error(`Stack underflow for 'rotate' in quotation.`);
                const z = stack.pop();
                const y = stack.pop();
                const x = stack.pop();
                stack.push(z, y, x);
                continue;
            }
            if (token === 'pop') {
                if (stack.length < 1) throw new Error(`Stack underflow for 'pop' in quotation.`);
                stack.pop();
                continue;
            }
            if (token === 'popd') {
                if (stack.length < 2) throw new Error(`Stack underflow for 'popd' in quotation.`);
                const y = stack.pop();
                stack.pop();
                stack.push(y);
                continue;
            }

            const isSwizzle = isGLSLTarget && /^[xyzw]{1,4}$/.test(token);
            if (isSwizzle) {
                if (stack.length < 1) throw new Error(`Stack underflow for swizzle operator '${token}'.`);
                const prev = stack.pop();
                // Avoid double parentheses on simple variables or already-parenthesized expressions
                const base = isSimpleVar(prev) || isAlreadyParenthesized(prev) ? prev : `(${prev})`;
                stack.push(`${base}.${token}`);
                continue;
            }

            const op = opMap[token];
            if (op) {
                const arity = arityMap[token] || op.length;
                if (stack.length < arity) throw new Error(`Stack underflow for operator in quotation: '${token}'.`);
                const args = [];
                for(let i=0; i<arity; i++) args.push(stack.pop());
                stack.push(op(...args));
                continue;
            }
        }
        
        throw new Error(`Unsupported operator in quotation: '${yieldFormatter(token)}'.`);
    }

    if (stack.length !== 1) {
        if (stack.length === 0 && quotation.length === 0) return ''; // Handle empty quotation
        throw new Error(`Quotation must result in a single value on the stack, but resulted in ${stack.length} values: [${stack.join(', ')}]`);
    }

    return stack[0];
};

// Helper exports for specific targets
export const transpileJS = (quotation: any[]) => {
    return transpileQuotation(quotation, jsOpMap, jsArityMap, new Set(['t', 'mousex', 'mousey', 'mousedx', 'mousedy']), false);
};

export const transpileGLSL = (quotation: any[]) => {
    const specialVars = new Set([
        'p', 't', 'uv', 'width', 'height',
        'mouse', 'mousex', 'mousey', 
        'moused', 'mousedx', 'mousedy', 'moused?',
        'u_resolution'
    ]);
    return transpileQuotation(quotation, glslOpMap, glslArityMap, specialVars, true);
};