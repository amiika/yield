import type { Operator } from '../../types';

export const log10: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.log10(s.pop())); },
        description: 'Base-10 logarithm.',
        example: '100 log10',
        effect: '[F] -> [G]'
    },
    testCases: [
        { code: '100 log10', expected: [2]}
    ]
};