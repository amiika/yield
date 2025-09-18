
import type { Operator } from '../../types';

export const setheading: Operator = {
    definition: {
        exec: function*() {
            throw new Error(`Operator 'setheading' can only be used inside a quotation for 'image' or 'march'.`);
        },
        description: `Sets the turtle's heading to an absolute angle in degrees (0 is up). Must be used inside a quotation passed to 'image' (2D).`,
        effect: `(in quotation) [degrees] -> []`
    },
    examples: [
        {
            code: `((0 0) p 180 setheading 50 forward) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader object rendering a line pointing down."
        }
    ]
};