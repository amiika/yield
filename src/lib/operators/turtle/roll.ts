
import type { Operator } from '../../types';

export const roll: Operator = {
    definition: {
        exec: function*() {
            throw new Error(`Operator 'roll' can only be used inside a quotation for 'march'.`);
        },
        description: `Rotates the 3D turtle around its local forward-axis (roll). Must be used inside a quotation passed to 'march'.`,
        effect: `(in quotation) [degrees] -> []`
    },
    examples: [
        {
            code: `((0 0 0) p 45 roll 10 move) march render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader object rendering a 3D line."
        }
    ]
};