import type { Operator } from '../../types';

export const has: Operator = {
    definition: {
        exec: function*(s) { const x = s.pop(), a = s.pop(); s.push(a.includes(x)); },
        description: 'Tests if a list contains an element. Postfix form.',
        example: '[1 2 3] 2 has',
        effect: '[A X] -> [bool]'
    },
    testCases: [
        { code: '[1 2 3] 2 has', expected: [true] },
        { code: '[1 2 3] 4 has', expected: [false] },
    ]
};