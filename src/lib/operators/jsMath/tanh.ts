import type { Operator } from '../../types';

export const tanh: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.tanh(s.pop())); },
        description: 'Hyperbolic tangent.',
        example: '1 tanh',
        effect: '[F] -> [G]'
    },
    testCases: [
        { code: '0 tanh', expected: [0]}
    ]
};