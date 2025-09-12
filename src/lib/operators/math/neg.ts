import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const neg: Operator = {
    definition: {
        exec: function*(s) { 
            const a = s.pop();
            if (isMatrix(a)) {
                s.push((a as number[][]).map(row => row.map(val => -val)));
            } else {
                s.push(-(a ?? 0)); 
            }
        },
        description: 'Negates the top element. Supports matrices for element-wise negation.',
        effect: '[N] -> [N\']'
    },
    examples: [
        { code: '15 neg', expected: [-15] },
        { code: '-10 neg', expected: [10] },
        { code: 'neg', expected: [0] },
        { code: '((1 -2)(3 -4)) neg', expected: [[[-1, 2], [-3, 4]]]}
    ]
};
