import type { Operator } from '../../types';

export const neg: Operator = {
    definition: {
        exec: function*(s) { s.push(-(s.pop() ?? 0)); },
        description: 'Negates the top element.',
        example: '15 neg',
        effect: '[N] -> [N\']'
    },
    testCases: [
        { code: '15 neg', expected: [-15] },
        { code: '-10 neg', expected: [10] },
        { code: 'neg', expected: [0] }
    ]
};