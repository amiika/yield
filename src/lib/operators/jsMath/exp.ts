import type { Operator } from '../../types';

export const exp: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.exp(s.pop())); },
        description: 'Exponential function (e^x).',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '1 exp', expected: [Math.E] },
        { code: '0 exp', expected: [1]}
    ]
};