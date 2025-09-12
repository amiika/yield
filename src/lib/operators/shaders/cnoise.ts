
import type { Operator } from '../../types';
import { toGLSL } from './glsl-generator';

export const cnoise: Operator = {
    definition: {
        exec: function*(s) {
            const input = s.pop();
            const glslInput = toGLSL(input);
            if (!glslInput) throw new Error('cnoise expects an input value (e.g., a vec2, vec3, or a glsl_expression object)');
            // Remap noise from [0, 1] to [0.2, 1.0] for a brighter base material
            s.push({ type: 'color', expression: `vec3(0.2 + 0.8 * cnoise(${glslInput}))` });
        },
        description: "Creates a color from Classic Perlin noise. The noise function's output range of [0.0, 1.0] is remapped to [0.2, 1.0] to create a brighter, more visible material, which is then used for all three (R,G,B) color channels. The input should be a vec2, vec3, or a `glsl_expression`, which can be constructed from GLSL variables like `p` (hit position) and `t` (time) for animation, using the `glsl` combinator.",
        effect: '[vec] -> [color]'
    },
    examples: [{
        code: `1.5 sphere (p xy t +) glsl cnoise material march render`,
        assert: s => s[0]?.type === 'shader',
        expectedDescription: 'A shader object with a sphere textured with animated noise.'
    },
    {
        code: `
# Warp the noise pattern by swapping the X and Y coordinates
1.0 sphere
(
  p yxz # Swizzle coordinates to warp the texture
  5 *   # Scale the noise for more detail
  t +   # Animate the noise over time
) glsl cnoise material
march render`,
        assert: s => s[0]?.type === 'shader',
        expectedDescription: 'A shader object with a sphere textured with animated, warped noise.'
    }]
};