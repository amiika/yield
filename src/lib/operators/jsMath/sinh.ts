import type { Operator } from '../../types';

export const sinh: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.sinh(s.pop())); },
        description: 'Hyperbolic sine.',
        example: '0 sinh',
        effect: '[F] -> [G]'
    },
    testCases: [
        { code: '0 sinh', expected: [0]}
    ]
};