
import type { Operator } from '../../types';

export const penup: Operator = {
    definition: {
        exec: function*() {
            throw new Error(`Operator 'penup' can only be used inside a quotation for 'image' or 'march'.`);
        },
        description: `Lifts the turtle's pen, so it won't draw when moved. Must be used inside a rendering quotation.`,
        effect: `(in quotation) [] -> []`
    },
    examples: [
        {
            code: `((0 0) p 50 forward penup 50 forward) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader object rendering only the first half of a line."
        }
    ]
};