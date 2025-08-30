import type { Operator } from '../../types';

export const greaterThan: Operator = {
    definition: {
        exec: function*(s) { const b = s.pop(), a = s.pop(); s.push(a > b); },
        description: 'Tests if A is greater than B.',
        example: '10 5 >',
        effect: '[A B] -> [bool]'
    },
    testCases: [
        { code: '10 5 >', expected: [true] },
        { code: '10 10 >', expected: [false] },
        { code: '5 10 >', expected: [false] },
    ]
};