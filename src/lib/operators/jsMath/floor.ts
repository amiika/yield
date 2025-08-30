import type { Operator } from '../../types';

export const floor: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.floor(s.pop())); },
        description: 'Rounds a number down to the nearest integer.',
        example: '3.7 floor',
        effect: '[F] -> [G]'
    },
    testCases: [
        { code: '3.7 floor', expected: [3]}
    ]
};