
import type { Operator } from '../../types';

export const down: Operator = {
    definition: {
        exec: function*() {
            throw new Error(`Operator 'down' can only be used inside a quotation for 'image' or 'march'.`);
        },
        description: `Moves the turtle backward by a given distance. Alias for 'backward'. Must be used inside a rendering quotation.`,
        effect: `(in quotation) [distance] -> []`
    },
    examples: [
        {
            code: `((0 0) p 50 down) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader object rendering a single line."
        }
    ]
};