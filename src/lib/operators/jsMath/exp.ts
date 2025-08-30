import type { Operator } from '../../types';

export const exp: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.exp(s.pop())); },
        description: 'Exponential function (e^x).',
        example: '1 exp',
        effect: '[F] -> [G]'
    },
    testCases: [
        { code: '0 exp', expected: [1]}
    ]
};