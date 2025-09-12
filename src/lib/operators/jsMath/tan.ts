import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const tan: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as number[][]).map(row => row.map(val => Math.tan(val))));
            } else {
                s.push(Math.tan(a));
            }
        },
        description: 'Tangent. Supports element-wise operation on matrices.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '0 tan', expected: [0]},
        { code: '((0 1)(-1 2)) tan', assert: s => isMatrix(s[0])}
    ]
};
