import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const tanh: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as number[][]).map(row => row.map(val => Math.tanh(val))));
            } else {
                s.push(Math.tanh(a));
            }
        },
        description: 'Hyperbolic tangent. Supports element-wise operation on matrices.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '1 tanh', expected: [0.7615941559557649] },
        { code: '0 tanh', expected: [0]},
        { code: '((0 1)(-1 2)) tanh', assert: s => isMatrix(s[0])}
    ]
};
