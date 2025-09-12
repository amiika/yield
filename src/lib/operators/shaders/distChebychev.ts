import type { Operator } from '../../types';

export const distChebychev: Operator = {
    definition: {
        exec: function*() { throw new Error(`Operator 'distChebychev' can only be used inside a 'glsl' quotation.`); },
        description: 'Calculates the Chebychev (chessboard) distance between two vectors. Must be used inside a `glsl` quotation.',
        effect: '[vecA vecB] -> [float]'
    },
    examples: [{
        code: `2 2 2 vec3 box
(
  # Calculate Chebychev distance from the center
  p xy 0 0 vec2 distChebychev
  
  # Scale distance to create more hue cycles
  5 *
  
  # Create a colorful pattern by mapping distance to hue
  1.0 1.0 hsv
) glsl material
march
render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: `A shader object rendering a box with colorful square-shaped ripples.`
    }, {
        code: `2 2 2 vec3 box
(
  # Animate the center of the distance calculation
  p xy
  (t sin) glsl (t cos) glsl vec2
  distChebychev
  
  # Create ripples
  10 * sin
  
  # Make it grayscale
  dup dup vec3
) glsl material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: `A shader object rendering a box with square-shaped ripples moving in a circle.`
    }]
};