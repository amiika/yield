

import type { Operator } from '../../types';
import { toGLSL } from './glsl-generator';

export const julia: Operator = {
    definition: {
        exec: function*(s) {
            const r = s.pop();
            const c = s.pop();
            s.push({ type: 'color', expression: `vec3(juliaSDF(p.xy, ${toGLSL(c)}, ${toGLSL(r)}))` });
        },
        description: `A convenient high-level operator that creates a complete grayscale Julia set material. It takes a \`c\` parameter (a vec2) which defines the fractal's shape, and an \`r\` parameter (a float) which controls the radius/zoom. For more advanced control over color and animation, see the \`juliaset\` operator.`,
        effect: '[c_vec2 r_float] -> [color]'
    },
    examples: [
        {
            code: `
# A static Julia set with a classic appearance
2.0 sphere
  -0.745 0.113 vec2  # 'c' constant
  1.0                # radius
  julia              # generate grayscale material
material
march render`,
            assert: s => s[0]?.type === 'shader',
            expectedDescription: 'A shader object with a sphere textured with a classic Julia set.'
        },
        {
            code: `
# A colorful Julia set using 'juliaset' multiplied by a 'wavecolor'
2.0 sphere

# Push arguments for juliaset
(p xy) glsl
-0.745 0.113 vec2
1.0
juliaset  # -> stack has [glsl_expr_julia]

# Create a wavecolor vector as a glsl_expression
(t 1.0 * sin abs t 1.2 * sin abs t 1.4 * sin abs vec3) glsl    # -> stack has [glsl_expr_julia, glsl_expr_wave]

# Multiply them. The '*' operator is shader-aware.
*         # -> stack has [glsl_expr_final]

material
march render`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: 'A shader object rendering a sphere with an animated, colorful Julia fractal.'
        }
    ]
};