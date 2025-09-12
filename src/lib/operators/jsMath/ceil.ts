import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const ceil: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as number[][]).map(row => row.map(val => Math.ceil(val))));
            } else {
                s.push(Math.ceil(a));
            }
        },
        description: 'Rounds a number up to the nearest integer. Supports element-wise operation on matrices.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '3.1 ceil', expected: [4]},
        { code: '((3.1 2.9)(-1.5 0)) ceil', expected: [[[4, 3], [-1, 0]]]}
    ]
};
