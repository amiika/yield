import type { Operator } from '../../types';

export const trunc: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.trunc(s.pop())); },
        description: 'Truncates the fractional part of a number.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '3.7 trunc', expected: [3]}
    ]
};