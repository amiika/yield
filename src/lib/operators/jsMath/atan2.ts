import type { Operator } from '../../types';

export const atan2: Operator = {
    definition: {
        exec: function*(s) { const b=s.pop(), a=s.pop(); s.push(Math.atan2(a,b)); },
        description: 'Arctangent of a quotient.',
        effect: '[F G] -> [H]'
    },
    examples: [
        { code: '1 1 atan2', expected: [0.7853981633974483] },
        { code: '10 5 atan2', assert: (s) => s.length === 1 && typeof s[0] === 'number', expectedType: 'number' }
    ]
};