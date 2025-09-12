import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const cosh: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as number[][]).map(row => row.map(val => Math.cosh(val))));
            } else {
                s.push(Math.cosh(a));
            }
        },
        description: 'Hyperbolic cosine. Supports element-wise operation on matrices.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '0 cosh', expected: [1]},
        { code: '((0 1)(-1 2)) cosh', assert: s => isMatrix(s[0])}
    ]
};
