import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const sin: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as number[][]).map(row => row.map(val => Math.sin(val))));
            } else {
                s.push(Math.sin(a));
            }
        },
        description: 'Sine. Supports element-wise operation on matrices.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '0.5 sin', expected: [0.479425538604203] },
        { code: '0 sin', expected: [0] },
        { code: '((0.5 0)(1 2)) sin', assert: s => isMatrix(s[0])}
    ]
};