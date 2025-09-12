import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const floor: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as number[][]).map(row => row.map(val => Math.floor(val))));
            } else {
                s.push(Math.floor(a));
            }
        },
        description: 'Rounds a number down to the nearest integer. Supports element-wise operation on matrices.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '3.7 floor', expected: [3]},
        { code: '((3.7 2.1)(-1.5 0)) floor', expected: [[[3, 2], [-2, 0]]]}
    ]
};
