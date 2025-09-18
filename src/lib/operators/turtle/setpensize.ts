
import type { Operator } from '../../types';

export const setpensize: Operator = {
    definition: {
        exec: function*() {
            throw new Error(`Operator 'setpensize' can only be used inside a quotation for 'image' or 'march'.`);
        },
        description: `Sets the turtle's pen size, which is a multiplier of the default thickness. Must be used inside a rendering quotation.`,
        effect: `(in quotation) [size] -> []`
    },
    examples: [
        {
            code: `((0 0) p 5 setpensize 50 forward) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader object rendering a thick line."
        }
    ]
};