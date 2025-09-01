import type { Operator } from '../../types';

export const cosh: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.cosh(s.pop())); },
        description: 'Hyperbolic cosine.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '0 cosh', expected: [1]}
    ]
};