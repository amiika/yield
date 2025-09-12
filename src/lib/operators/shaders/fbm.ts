

import type { Operator } from '../../types';
import { toGLSL } from './glsl-generator';

export const fbm: Operator = {
    definition: {
        exec: function*(s) {
            const input = s.pop();
            const glslInput = toGLSL(input);
            if (!glslInput) throw new Error('fbm expects an input value (e.g., a vec2, vec3, or a glsl_expression object)');
            s.push({ type: 'color', expression: `vec3(fbm(${glslInput}))` });
        },
        description: 'Creates a color from Fractional Brownian Motion noise, which is good for generating natural-looking textures like clouds or terrain. The input should be a vec2, vec3, or a `glsl_expression`, which can be constructed from GLSL variables like `p` (hit position) and `t` (time) for animation, using the `glsl` combinator.',
        effect: '[vec] -> [color]'
    },
    examples: [{
        code: `1.0 sphere (p 3 * t +) glsl fbm material march render`,
        assert: s => s[0]?.type === 'shader',
        expectedDescription: 'A shader object with a sphere textured with animated FBM noise.'
    }, {
        code: `1.0 sphere
(
    # Calculate a noise value based on 3D position and time
    p 3 * t + fbm
    
    # Remap the noise value to a 0-1 range with a smooth curve
    # This creates more defined "hot" and "cold" areas
    0.3 0.7 smoothstep
    
    # Define our two colors for the fire gradient
    1.0 0.1 0.0 vec3 # Dark orange
    1.0 0.9 0.0 vec3 # Bright yellow
    
    # Arrange stack for mix: [colorA, colorB, interpolant]
    rolldown
    
    # Blend between the two colors based on the remapped noise
    fuse
) glsl material
march
render`,
        assert: s => s[0]?.type === 'shader',
        expectedDescription: 'A shader object with a sphere textured with animated fire-like FBM noise.'
    },
    {
        code: `
# Demonstrate tri-planar texturing with FBM
0.8 0.8 0.8 vec3 box
(
  # Get noise from 3 planes using swizzling
  p xy 2 * fbm
  p yz 2 * fbm
  p xz 2 * fbm

  # Average the results
  + + 0.333 *
  dup dup vec3 # make it grayscale
) glsl material
# Animate rotation to see all sides
(t 0.2 *) glsl 1 1 1 vec3 rotatesdf
march render`,
        assert: s => s[0]?.type === 'shader',
        expectedDescription: 'A shader object showing a box with a seamless FBM texture applied using tri-planar mapping.'
    }]
};