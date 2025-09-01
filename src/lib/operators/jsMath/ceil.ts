import type { Operator } from '../../types';

export const ceil: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.ceil(s.pop())); },
        description: 'Rounds a number up to the nearest integer.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '3.1 ceil', expected: [4]}
    ]
};