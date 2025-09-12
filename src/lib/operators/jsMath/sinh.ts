import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const sinh: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as number[][]).map(row => row.map(val => Math.sinh(val))));
            } else {
                s.push(Math.sinh(a));
            }
        },
        description: 'Hyperbolic sine. Supports element-wise operation on matrices.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '0 sinh', expected: [0]},
        { code: '((0 1)(-1 2)) sinh', assert: s => isMatrix(s[0])}
    ]
};
