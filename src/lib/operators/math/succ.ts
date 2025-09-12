import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const succ: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as number[][]).map(row => row.map(val => val + 1)));
            } else {
                s.push((a ?? 0) + 1);
            }
        },
        description: 'Successor. Adds 1 to the top element. Supports matrices for element-wise operation.',
        effect: '[N] -> [N+1]'
    },
    examples: [
        { code: '10 succ', expected: [11] },
        { code: '-1 succ', expected: [0] },
        { code: 'succ', expected: [1] },
        { code: '10 ++', expected: [11] },
        { code: '((1 2)(3 4)) succ', expected: [[[2, 3], [4, 5]]]}
    ]
};
