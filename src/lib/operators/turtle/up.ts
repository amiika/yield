
import type { Operator } from '../../types';

export const up: Operator = {
    definition: {
        exec: function*() {
            throw new Error(`Operator 'up' can only be used inside a quotation for 'image' or 'march'.`);
        },
        description: `Moves the turtle forward by a given distance. Alias for 'forward'. Must be used inside a rendering quotation.`,
        effect: `(in quotation) [distance] -> []`
    },
    examples: [
        {
            code: `((0 0) p 50 up) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader object rendering a single line."
        }
    ]
};