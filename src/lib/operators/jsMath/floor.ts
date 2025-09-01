import type { Operator } from '../../types';

export const floor: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.floor(s.pop())); },
        description: 'Rounds a number down to the nearest integer.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '3.7 floor', expected: [3]}
    ]
};