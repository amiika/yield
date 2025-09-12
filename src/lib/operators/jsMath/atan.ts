import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const atan: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as number[][]).map(row => row.map(val => Math.atan(val))));
            } else {
                s.push(Math.atan(a));
            }
        },
        description: 'Arctangent. Supports element-wise operation on matrices.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '1 atan', expected: [0.7853981633974483] },
        { code: '0 atan', expected: [0] },
        { code: '((1 0)(10 -10)) atan', assert: s => isMatrix(s[0]) }
    ]
};
