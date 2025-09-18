
import type { Operator } from '../../types';

export const setxy: Operator = {
    definition: {
        exec: function*() {
            throw new Error(`Operator 'setxy' can only be used inside a quotation for 'image' or 'march'.`);
        },
        description: `Moves the turtle to an absolute (x, y) position. Must be used inside a quotation passed to 'image' (2D).`,
        effect: `(in quotation) [x y] -> []`
    },
    examples: [
        {
            code: `((0 0) p 50 100 setxy) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader object rendering a line from the origin to (50, 100)."
        }
    ]
};