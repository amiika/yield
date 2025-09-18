
import type { Operator } from '../../types';

export const backward: Operator = {
    definition: {
        exec: function*() {
            throw new Error(`Operator 'backward' can only be used inside a quotation for 'image' or 'march'.`);
        },
        description: `Moves the turtle backward by a given distance. Must be used inside a quotation passed to 'image' (2D) or 'march' (3D).`,
        effect: `(in quotation) [distance] -> []`
    },
    examples: [
        {
            code: `((0 0) p 50 backward) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader object rendering a single line."
        }
    ]
};