import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const pred: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as number[][]).map(row => row.map(val => val - 1)));
            } else {
                s.push((a ?? 0) - 1);
            }
        },
        description: 'Predecessor. Subtracts 1 from the top element. Supports matrices for element-wise operation.',
        effect: '[N] -> [N-1]'
    },
    examples: [
        { code: '10 pred', expected: [9] },
        { code: '0 pred', expected: [-1] },
        { code: 'pred', expected: [-1] },
        { code: '10 --', expected: [9] },
        { code: '((1 2)(3 4)) pred', expected: [[[0, 1], [2, 3]]]}
    ]
};
