import type { Operator } from '../../types';

export const forward: Operator = {
    definition: {
        exec: function*() {
            throw new Error(`Operator 'forward' can only be used inside a quotation for 'image' or 'march'.`);
        },
        description: `Sets the forward step distance for subsequent L-System string commands that are processed by the 'move' operator. This operator does not move the turtle itself.`,
        effect: `(in quotation) [distance_num] -> []`
    },
    examples: [
        {
            code: `( (0 0) p 50 forward "FF" move ) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader that draws a line of length 100 (2 steps of 50)."
        }
    ]
};