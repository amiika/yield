
import type { Operator } from '../../types';

export const setpencolor: Operator = {
    definition: {
        exec: function*() {
            throw new Error(`Operator 'setpencolor' can only be used inside a quotation for 'image' or 'march'.`);
        },
        description: `Sets the turtle's pen color using RGB values (0-255). Must be used inside a rendering quotation.`,
        effect: `(in quotation) [r g b] -> []`
    },
    examples: [
        {
            code: `((0 0) p 255 0 0 setpencolor 50 forward) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader object rendering a red line."
        }
    ]
};