import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const exp: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as number[][]).map(row => row.map(val => Math.exp(val))));
            } else {
                s.push(Math.exp(a));
            }
        },
        description: 'Exponential function (e^x). Supports element-wise operation on matrices.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '1 exp', expected: [Math.E] },
        { code: '0 exp', expected: [1]},
        { code: '((0 1)(2 3)) exp', assert: s => isMatrix(s[0])}
    ]
};
