import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const cos: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as number[][]).map(row => row.map(val => Math.cos(val))));
            } else {
                s.push(Math.cos(a));
            }
        },
        description: 'Cosine. Supports element-wise operation on matrices.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '0.5 cos', assert: (s) => s.length === 1 && typeof s[0] === 'number' },
        { code: '0 cos', expected: [1]},
        { code: '((0 0.5)(1 2)) cos', assert: s => isMatrix(s[0])}
    ]
};