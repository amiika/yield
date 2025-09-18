
import type { Operator } from '../../types';

export const left: Operator = {
    definition: {
        exec: function*() {
            throw new Error(`Operator 'left' can only be used inside a quotation for 'image' or 'march'.`);
        },
        description: `Turns the turtle left by a given number of degrees. Must be used inside a quotation passed to 'image' (2D).`,
        effect: `(in quotation) [degrees] -> []`
    },
    examples: [
        {
            code: `((0 0) p 90 left 50 forward) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader object rendering a horizontal line."
        }
    ]
};