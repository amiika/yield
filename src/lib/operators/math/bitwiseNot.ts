import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const bitwiseNot: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as number[][]).map(row => row.map(val => ~(val | 0))));
            } else {
                s.push(~(a | 0));
            }
        },
        description: 'Bitwise NOT. Inverts the bits of the top element. Supports matrices for element-wise operation. The operand is treated as a 32-bit integer.',
        effect: '[A] -> [C]'
    },
    examples: [
        { code: '5 ~', expected: [-6] },
        { code: '-1 ~', expected: [0] },
        { code: '((5 -1)(0 255)) ~', expected: [[[-6, 0], [-1, -256]]]}
    ]
};
