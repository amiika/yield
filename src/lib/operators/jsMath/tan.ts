import type { Operator } from '../../types';

export const tan: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.tan(s.pop())); },
        description: 'Tangent.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '0 tan', expected: [0]}
    ]
};