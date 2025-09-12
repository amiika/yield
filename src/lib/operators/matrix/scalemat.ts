import type { Operator, GLSLExpression } from '../../types';

const isGLSLExpression = (v: any): v is GLSLExpression => v?.type === 'glsl_expression';

// Helper to format numbers for GLSL, adding ".0" to integers.
const numToGLSL = (val: number): string => {
    const s = val.toString();
    if (Number.isInteger(val) && !s.includes('e') && !s.includes('.')) {
        return s + '.0';
    }
    return s;
};

export const scalemat: Operator = {
    definition: {
        exec: function*(s) {
            const z_scale = s.pop();
            const y_scale = s.pop();
            const x_scale = s.pop();

            const isDynamic = isGLSLExpression(x_scale) || isGLSLExpression(y_scale) || isGLSLExpression(z_scale);

            if (isDynamic) {
                const x_code = isGLSLExpression(x_scale) ? x_scale.code : numToGLSL(x_scale);
                const y_code = isGLSLExpression(y_scale) ? y_scale.code : numToGLSL(y_scale);
                const z_code = isGLSLExpression(z_scale) ? z_scale.code : numToGLSL(z_scale);

                const expression: GLSLExpression = {
                    type: 'glsl_expression',
                    code: `mat3(${x_code}, 0.0, 0.0, 0.0, ${y_code}, 0.0, 0.0, 0.0, ${z_code})`,
                    returnType: 'mat3',
                };
                s.push(expression);

            } else {
                // Static matrix calculation
                if (typeof x_scale !== 'number' || typeof y_scale !== 'number' || typeof z_scale !== 'number') {
                    throw new Error('scalemat expects three numbers or glsl_expressions for x, y, z scales.');
                }
                const matrix = [
                    [x_scale, 0, 0],
                    [0, y_scale, 0],
                    [0, 0, z_scale]
                ];
                s.push(matrix);
            }
        },
        description: 'Creates a 3x3 scaling matrix from x, y, and z scale factors. Factors can be numbers for a static matrix or `glsl_expression`s for a dynamic matrix used in shaders.',
        effect: '[sx sy sz] -> [matrix]'
    },
    examples: [
        {
            code: '2 1 1 scalemat',
            expected: [[[2, 0, 0], [0, 1, 0], [0, 0, 1]]]
        },
        {
            code: `
0.5 sphere
(t sin 0.5 * 1 +) glsl # dynamic x scale
1.0                     # static y scale
1.0                     # static z scale
scalemat
transform
march render`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: 'A shader object rendering a sphere pulsing in size along the x-axis.'
        }
    ]
};