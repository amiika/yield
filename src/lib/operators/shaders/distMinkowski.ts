import type { Operator } from '../../types';

export const distMinkowski: Operator = {
    definition: {
        exec: function*() { throw new Error(`Operator 'distMinkowski' can only be used inside a 'glsl' quotation.`); },
        description: 'Calculates the Minkowski distance between two vectors with an exponent p. Must be used inside a `glsl` quotation.',
        effect: '[vecA vecB p] -> [float]'
    },
    examples: [{
        code: `2 2 2 vec3 box
(
  # Calculate Minkowski distance with an exponent of 4.0
  p xy 0 0 vec2 4.0 distMinkowski
  
  # Scale distance to create more hue cycles
  5 *
  
  # Create a colorful pattern by mapping distance to hue
  1.0 1.0 hsv
) glsl material
march
render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: `A shader object rendering a box with colorful 'squircle'-shaped ripples.`
    }, {
        code: `2 2 2 vec3 box
(
  # Animate the exponent 'p' over time to morph the shape
  p xy 0 0 vec2
  t 0.5 * sin 3.0 * 2.5 +
  
  # Stack is now [vec_a, vec_b, p_val], which is the correct order
  distMinkowski
  
  # Scale distance to create more hue cycles
  5 *
  
  # Create a colorful pattern by mapping distance to hue
  1.0 1.0 hsv
) glsl material
march
render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: `A shader object rendering a box with an animated, colorful morphing ripple pattern.`
    }]
};