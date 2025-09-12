import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const ln: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as number[][]).map(row => row.map(val => Math.log(val))));
            } else {
                s.push(Math.log(a));
            }
        },
        description: 'Natural logarithm (base e). Supports element-wise operation on matrices.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '1 ln', expected: [0]},
        { code: '((1 2)(10 20)) ln', assert: s => isMatrix(s[0])}
    ]
};
