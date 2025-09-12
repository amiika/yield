import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

const isVector = (v: any, len: number): v is number[] =>
    Array.isArray(v) && !isMatrix(v) && v.length === len && v.every(el => typeof el === 'number');

// Helper to format numbers for GLSL, adding ".0" to integers.
const numToGLSL = (val: number): string => {
    const s = val.toString();
    if (Number.isInteger(val) && !s.includes('e') && !s.includes('.')) {
        return s + '.0';
    }
    return s;
};

export const matrot: Operator = {
    definition: {
        exec: function*(s) {
            const axis = s.pop();
            const angle = s.pop(); // Don't cast to number yet

            if (typeof angle !== 'number' && angle?.type !== 'glsl_expression') {
                throw new Error('matrot expects a number or glsl_expression for the angle (in radians).');
            }
            if (!isVector(axis, 3)) {
                throw new Error('matrot expects a vec3 for the axis of rotation.');
            }
            
            // Normalize the axis vector
            const len = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);
            if (len === 0) {
                 // Return identity matrix if axis is zero vector
                s.push([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
                return;
            }
            const x = axis[0] / len;
            const y = axis[1] / len;
            const z = axis[2] / len;

            if (typeof angle === 'number') {
                // --- Static Matrix Calculation ---
                const c = Math.cos(angle);
                const sVal = Math.sin(angle);
                const C = 1 - c;

                const matrix = [
                    [x*x*C + c,   x*y*C - z*sVal, x*z*C + y*sVal],
                    [y*x*C + z*sVal, y*y*C + c,   y*z*C - x*sVal],
                    [z*x*C - y*sVal, z*y*C + x*sVal, z*z*C + c  ]
                ];
                s.push(matrix);
            } else { 
                // --- Dynamic GLSL Expression Generation ---
                const angleCode = angle.code;
                const axisGLSL = `vec3(${numToGLSL(x)}, ${numToGLSL(y)}, ${numToGLSL(z)})`;
                
                const expression = {
                    type: 'glsl_expression',
                    code: `rotationMatrix(${axisGLSL}, ${angleCode})`,
                    returnType: 'mat3',
                };
                s.push(expression);
            }
        },
        description: 'Creates a 3x3 rotation matrix from an angle (in radians) and a 3D axis vector. The angle can be a number for a static matrix or a `glsl_expression` for a dynamic matrix used in shaders.',
        effect: '[F_angle|glsl_expr V_axis] -> [matrix]'
    },
    examples: [
        {
            code: '3.14159 0 1 0 vec3 matrot', // 180 deg around Y
            assert: (s) => {
                const m = s[0];
                return s.length === 1 && isMatrix(m) &&
                    Math.abs(m[0][0] - -1) < 1e-4 &&
                    Math.abs(m[2][2] - -1) < 1e-4;
            },
            expectedDescription: 'A 3x3 matrix representing a 180-degree rotation around the Y-axis.'
        },
        {
            code: 
`1 1 1 vec3 box
(t) glsl 1 2 3 vec3 matrot
transform
march
render`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: 'A shader object rendering an animated, rotating sphere.'
        }
    ]
};