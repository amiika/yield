import type { Operator } from '../../types';

export const smoothstep: Operator = {
    definition: {
        exec: function*() { throw new Error(`Operator 'smoothstep' can only be used inside a 'glsl' quotation.`); },
        description: 'Performs smooth Hermite interpolation between 0 and 1 when `edge0 < x < edge1`. Must be used inside a `glsl` quotation.',
        effect: '[x edge0 edge1] -> [result]'
    },
    examples: [{
        code: `1.0 sphere
(
    # Use surface position's x-coordinate as input
    p x
    
    # Smoothly transition between 0 and 1 in the range [-0.5, 0.5]
    -0.5 0.5 smoothstep
    
    # Use the result to create a grayscale color
    dup dup vec3
    
) glsl material
march
render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: `A shader object rendering a sphere with a smooth black-to-white gradient.`
    }]
};