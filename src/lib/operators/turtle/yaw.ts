
import type { Operator } from '../../types';

export const yaw: Operator = {
    definition: {
        exec: function*() {
            throw new Error(`Operator 'yaw' can only be used inside a quotation for 'march'.`);
        },
        description: `Rotates the 3D turtle's heading around its local up-axis (yaw). Must be used inside a quotation passed to 'march'.`,
        effect: `(in quotation) [degrees] -> []`
    },
    examples: [
        {
            code: `((0 0 0) p 90 yaw 10 move) march render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader object rendering a 3D line."
        }
    ]
};