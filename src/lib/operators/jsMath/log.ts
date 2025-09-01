import type { Operator } from '../../types';

export const ln: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.log(s.pop())); },
        description: 'Natural logarithm (base e).',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '1 ln', expected: [0]}
    ]
};