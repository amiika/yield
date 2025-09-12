import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const asin: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as number[][]).map(row => row.map(val => Math.asin(val))));
            } else {
                s.push(Math.asin(a));
            }
        },
        description: 'Arcsine. Supports element-wise operation on matrices.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '0.5 asin', assert: s => s.length === 1 && typeof s[0] === 'number' && s[0].toFixed(15) === '0.523598775598299' },
        { code: '0 asin', expected: [0] },
        { code: '((0.5 0)(1 -1)) asin', assert: s => isMatrix(s[0]) }
    ]
};
