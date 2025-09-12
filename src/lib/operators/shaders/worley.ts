

import type { Operator } from '../../types';
import { toGLSL } from './glsl-generator';

export const worley: Operator = {
    definition: {
        exec: function*(s) {
            const input = s.pop();
            const glslInput = toGLSL(input);
            if (!glslInput) throw new Error('worley expects an input value (e.g., a vec2, vec3, or a glsl_expression object)');
            // The user example shows 1.0 - d, which gives the classic cell look.
            // worley().x is the distance to the nearest point.
            s.push({ type: 'color', expression: `vec3(1.0 - worley(${glslInput}).x)` });
        },
        description: 'Creates a color from Worley noise (Voronoi cells). The input should be a vec2, vec3, or a `glsl_expression`, which can be constructed from GLSL variables like `p` (hit position) and `t` (time) for animation, using the `glsl` combinator.',
        effect: '[vec] -> [color]'
    },
    examples: [{
        code: `0.4 0.4 0.4 vec3 0.1 roundbox (p xy 10 * t +) glsl worley material
march
1 1 1 vec3 "white" 1 light
render`,
        assert: s => s[0]?.type === 'shader',
        expectedDescription: 'A shader object with a roundbox textured with animated Worley noise.'
    },
    {
        code: `
# Animate a 2D slice through a 3D noise volume
1 1 1 vec3 box
(
  p x      # Use surface x
  p y      # Use surface y
  t 0.5 *  # Animate the z-coordinate to slice through the noise
  vec3
  5 *      # Scale the noise for more detail
) glsl worley material
march render`,
        assert: s => s[0]?.type === 'shader',
        expectedDescription: 'A shader object with a box textured with an animated 2D slice of 3D Worley noise.'
    }]
};