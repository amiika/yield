import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const trunc: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as number[][]).map(row => row.map(val => Math.trunc(val))));
            } else {
                s.push(Math.trunc(a));
            }
        },
        description: 'Truncates the fractional part of a number. Supports element-wise operation on matrices.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '3.7 trunc', expected: [3]},
        { code: '((3.7 -2.1)(1.9 0)) trunc', expected: [[[3, -2], [1, 0]]]}
    ]
};
