import type { Operator } from '../../types';

export const trunc: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.trunc(s.pop())); },
        description: 'Truncates the fractional part of a number.',
        example: '3.7 trunc',
        effect: '[F] -> [G]'
    },
    testCases: [
        { code: '3.7 trunc', expected: [3]}
    ]
};