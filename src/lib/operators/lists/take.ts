import type { Operator } from '../../types';

export const take: Operator = {
    definition: {
        exec: function*(s) { const n = s.pop(), a = s.pop(); s.push(a.slice(0, n)); },
        description: 'Takes the first N elements from a list.',
        example: '[1 2 3 4 5] 2 take',
        effect: '[A N] -> [B]'
    },
    testCases: [
        { code: '[1 2 3 4 5] 2 take', expected: [[1, 2]] },
        { code: '"hello" 2 take', expected: ["he"] },
    ]
};