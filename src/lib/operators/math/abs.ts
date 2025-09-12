import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const abs: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as number[][]).map(row => row.map(val => Math.abs(val))));
            } else {
                s.push(Math.abs(a ?? 0));
            }
        },
        description: 'Pushes the absolute value of the top element. Supports matrices for element-wise operation.',
        effect: '[N] -> [N\']'
    },
    examples: [
        { code: '-15 abs', expected: [15] },
        { code: '20 abs', expected: [20] },
        { code: 'abs', expected: [0] },
        { code: '((1 -2)(3 -4)) abs', expected: [[[1, 2], [3, 4]]]}
    ]
};
