import type { Operator } from '../../types';

export const fuse: Operator = {
    definition: {
        exec: function*() { throw new Error(`Operator 'fuse' can only be used inside a 'glsl' quotation.`); },
        description: 'Performs linear interpolation between two values. `mix(a, b, t)` is equivalent to `a*(1-t) + b*t`. Must be used inside a `glsl` quotation.',
        effect: '[a b t] -> [result]'
    },
    examples: [{
        code: `1.0 sphere
(
    # Define two colors
    0.912 0.793 0.486 vec3  # Gold
    1.000 0.351 0.089 vec3  # Orange

    # Create an interpolant that cycles over time
    t sin abs

    # Mix the two colors based on the interpolant
    fuse
) glsl material
march
render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: `A shader object rendering a sphere that smoothly transitions between two colors.`
    }]
};
