import type { Operator } from '../../types';

export const subtract: Operator = {
    definition: {
        exec: function*(s) { const b = s.pop(), a = s.pop(); s.push((a ?? 0) - (b ?? 0)); },
        description: 'Subtracts the top element from the second element.',
        example: '30 10 -',
        effect: '[A B] -> [C]'
    },
    testCases: [
        { code: '30 10 -', expected: [20] },
        { code: '5 10 -', expected: [-5] },
        { code: '10 -', expected: [-10] },
        { code: '-', expected: [0] }
    ]
};