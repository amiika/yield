import type { Operator } from '../../types';

export const tanh: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.tanh(s.pop())); },
        description: 'Hyperbolic tangent.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '1 tanh', expected: [0.7615941559557649] },
        { code: '0 tanh', expected: [0]}
    ]
};