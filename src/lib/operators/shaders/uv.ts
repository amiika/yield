
import type { Operator } from '../../types';

export const uv: Operator = {
    definition: {
        exec: function*() { throw new Error(`Operator 'uv' can only be used inside a 'glsl' quotation.`); },
        description: 'Provides the normalized screen coordinates as a `vec2`, where both X and Y range from 0.0 to 1.0. Must be used inside a `glsl` quotation.',
        effect: '-> [vec2]'
    },
    examples: [{
        code: `
(
  uv x # Use the U coordinate for the Red channel
  uv y # Use the V coordinate for the Green channel
  0.5  # Blue channel is static
  1.0  # Alpha
  vec4
) image render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: `A shader object rendering a full-screen color gradient.`
    }]
};
