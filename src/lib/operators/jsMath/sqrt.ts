import type { Operator } from '../../types';

export const sqrt: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.sqrt(s.pop())); },
        description: 'Square root.',
        example: '25 sqrt',
        effect: '[F] -> [G]'
    },
    testCases: [
        { code: '25 sqrt', expected: [5]}
    ]
};