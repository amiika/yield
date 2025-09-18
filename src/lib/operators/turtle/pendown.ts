
import type { Operator } from '../../types';

export const pendown: Operator = {
    definition: {
        exec: function*() {
            throw new Error(`Operator 'pendown' can only be used inside a quotation for 'image' or 'march'.`);
        },
        description: `Lowers the turtle's pen, so it will draw when moved. Must be used inside a rendering quotation.`,
        effect: `(in quotation) [] -> []`
    },
    examples: [
        {
            code: `((0 0) p penup 50 forward pendown 50 forward) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader object rendering only the second half of a line."
        }
    ]
};