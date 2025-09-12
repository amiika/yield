import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const log10: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as number[][]).map(row => row.map(val => Math.log10(val))));
            } else {
                s.push(Math.log10(a));
            }
        },
        description: 'Base-10 logarithm. Supports element-wise operation on matrices.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '100 log10', expected: [2]},
        { code: '((100 1000)(1 10)) log10', expected: [[[2, 3], [0, 1]]]}
    ]
};
