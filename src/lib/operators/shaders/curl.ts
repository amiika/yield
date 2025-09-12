

import type { Operator } from '../../types';
import { toGLSL } from './glsl-generator';

export const curl: Operator = {
    definition: {
        exec: function*(s) {
            const input = s.pop();
            const glslInput = toGLSL(input);
            if (!glslInput) throw new Error('curl expects an input value (e.g., a vec2, vec3, or a glsl_expression object)');
            s.push({ type: 'color', expression: `curl(${glslInput})` });
        },
        description: 'Creates a color from curl noise, which is useful for fluid-like patterns. The input should be a vec2, vec3, or a `glsl_expression`, which can be constructed from GLSL variables like `p` (hit position) and `t` (time) for animation, using the `glsl` combinator.',
        effect: '[vec] -> [color]'
    },
    examples: [{
        code: `0.4 0.4 0.4 vec3 0.1 roundbox (p xy t +) glsl curl material
march
1 1 1 vec3 "white" 0.1 light
render`,
        assert: s => s[0]?.type === 'shader',
        expectedDescription: 'A shader object with a roundbox textured with animated curl noise.'
    },
    {
        code: `
# Use the X and Z coordinates to apply 2D curl noise to a 3D shape
0.5 1.5 vec2 cylinder
# Rotate the cylinder to see the effect
(t 0.5 *) glsl 1 1 0 vec3 rotatesdf
(
  p xz # Project the 3D surface point to a 2D plane
  2 *  # Scale the noise pattern
  t +  # Animate the pattern over time
) glsl curl material
march
# Add a light for better visibility
2 2 4 vec3 "white" 0.1 light
render`,
        assert: s => s[0]?.type === 'shader',
        expectedDescription: 'A shader object with a cylinder textured with animated, flowing curl noise.'
    }]
};