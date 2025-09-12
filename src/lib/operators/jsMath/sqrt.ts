import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const sqrt: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as number[][]).map(row => row.map(val => Math.sqrt(val))));
            } else {
                s.push(Math.sqrt(a));
            }
        },
        description: 'Square root. Supports element-wise operation on matrices.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '25 sqrt', expected: [5]},
        { code: '((25 4)(9 16)) sqrt', expected: [[[5, 2], [3, 4]]]}
    ]
};
