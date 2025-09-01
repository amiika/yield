import type { Operator } from '../../types';

export const sinh: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.sinh(s.pop())); },
        description: 'Hyperbolic sine.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '0 sinh', expected: [0]}
    ]
};