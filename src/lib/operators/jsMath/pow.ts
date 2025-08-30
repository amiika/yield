import type { Operator } from '../../types';

export const pow: Operator = {
    definition: {
        exec: function*(s) { const b=s.pop(), a=s.pop(); s.push(Math.pow(a,b)); },
        description: 'Raises A to the power of B.',
        example: '2 8 pow',
        effect: '[F G] -> [H]'
    },
    testCases: [
        { code: '2 8 pow', expected: [256]}
    ]
};