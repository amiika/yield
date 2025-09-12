import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const sign: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as number[][]).map(row => row.map(val => Math.sign(val))));
            } else {
                s.push(Math.sign(a ?? 0));
            }
        },
        description: 'Pushes the sign of a number (-1, 0, or 1). Supports matrices for element-wise operation.',
        effect: '[N] -> [N\']'
    },
    examples: [
        { code: '-15 sign', expected: [-1] },
        { code: '15 sign', expected: [1] },
        { code: '0 sign', expected: [0] },
        { code: 'sign', expected: [0] },
        { code: '((10 -20)(0 5)) sign', expected: [[[1, -1], [0, 1]]]}
    ]
};
