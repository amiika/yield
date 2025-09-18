
import type { Operator } from '../../types';

export const pitch: Operator = {
    definition: {
        exec: function*() {
            throw new Error(`Operator 'pitch' can only be used inside a quotation for 'march'.`);
        },
        description: `Rotates the 3D turtle's heading up or down around its local right-axis (pitch). Must be used inside a quotation passed to 'march'.`,
        effect: `(in quotation) [degrees] -> []`
    },
    examples: [
        {
            code: `((0 0 0) p 45 pitch 10 move) march render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader object rendering a 3D line."
        }
    ]
};