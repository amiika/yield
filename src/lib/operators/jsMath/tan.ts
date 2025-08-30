import type { Operator } from '../../types';

export const tan: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.tan(s.pop())); },
        description: 'Tangent.',
        example: '0 tan',
        effect: '[F] -> [G]'
    },
    testCases: [
        { code: '0 tan', expected: [0]}
    ]
};