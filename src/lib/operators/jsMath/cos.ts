import type { Operator } from '../../types';

export const cos: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.cos(s.pop())); },
        description: 'Cosine.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '0.5 cos', assert: (s) => s.length === 1 && typeof s[0] === 'number' },
        { code: '0 cos', expected: [1]}
    ]
};