import type { Operator } from '../../types';

export const cos: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.cos(s.pop())); },
        description: 'Cosine.',
        example: '0.5 cos',
        effect: '[F] -> [G]'
    },
    testCases: [
        { code: '0 cos', expected: [1]}
    ]
};