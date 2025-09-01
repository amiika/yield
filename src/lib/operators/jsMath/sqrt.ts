import type { Operator } from '../../types';

export const sqrt: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.sqrt(s.pop())); },
        description: 'Square root.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '25 sqrt', expected: [5]}
    ]
};