import type { Operator } from '../../types';

export const at: Operator = {
    definition: {
        exec: function*(s) { const i = s.pop(), a = s.pop(); s.push(a[i]); },
        description: 'Gets the element at a specific index.',
        example: '[10 20 30] 1 at',
        effect: '[A I] -> [X]'
    },
    testCases: [
        { code: '[10 20 30] 1 at', expected: [20] },
        { code: '"hello" 4 at', expected: ["o"] },
    ]
};