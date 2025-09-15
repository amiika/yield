
import type { Operator } from '../../types';

export const height: Operator = {
    definition: {
        exec: function*() { throw new Error(`Operator 'height' can only be used inside a 'glsl' quotation.`); },
        description: 'Provides the canvas height in pixels as a float. Must be used inside a `glsl` quotation.',
        effect: '-> [float]'
    },
    examples: [{
        code: `
# A plane to act as a canvas
0 1 0 vec3 0 plane

# Create a material that is a vertical gradient from black to green
(
  0.0         # Red channel is zero
  p y height / # Normalize y-coordinate to [0, 1] range
  0.0         # Blue channel is zero
  vec3
) glsl material

march
render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: `A shader object rendering a plane with a vertical green gradient.`
    }]
};
