import type { Operator } from '../../types';

export const ln: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.log(s.pop())); },
        description: 'Natural logarithm (base e).',
        example: '1 ln',
        effect: '[F] -> [G]'
    },
    testCases: [
        { code: '1 ln', expected: [0]}
    ]
};
