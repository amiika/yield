import type { Operator } from '../../types';

export const lessThan: Operator = {
    definition: {
        exec: function*(s) { const b = s.pop(), a = s.pop(); s.push(a < b); },
        description: 'Tests if A is less than B.',
        example: '5 10 <',
        effect: '[A B] -> [bool]'
    },
    testCases: [
        { code: '5 10 <', expected: [true] },
        { code: '10 10 <', expected: [false] },
        { code: '10 5 <', expected: [false] },
    ]
};