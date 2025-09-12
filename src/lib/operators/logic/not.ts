import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const not: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as any[][]).map(row => row.map(val => !val ? 1 : 0)));
            } else {
                s.push(!a);
            }
        },
        description: 'Logical NOT. Replaces top of stack with its logical negation. Supports element-wise operation on matrices, resulting in 0s and 1s.',
        effect: '[A] -> [!A]'
    },
    examples: [
        { code: 'true not', expected: [false] },
        { code: 'false not', expected: [true] },
        { code: '0 not', expected: [true] },
        { code: '((1 0)("hello" ())) not', expected: [[[0, 1], [0, 0]]]}
    ]
};