import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const acos: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as number[][]).map(row => row.map(val => Math.acos(val))));
            } else {
                s.push(Math.acos(a));
            }
        },
        description: 'Arccosine. Supports element-wise operation on matrices.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '0.5 acos', assert: s => s.length === 1 && typeof s[0] === 'number' && s[0].toFixed(15) === '1.047197551196598' },
        { code: '1 acos', expected: [0] },
        { code: '((0.5 1)(0 -1)) acos', assert: s => isMatrix(s[0]) }
    ]
};
