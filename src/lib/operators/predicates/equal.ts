import type { Operator } from '../../types';

export const equal: Operator = {
    definition: {
        exec: function*(s) { const b = s.pop(), a = s.pop(); s.push(a === b); },
        description: 'Tests for strict equality.',
        example: '10 10 ==',
        effect: '[A B] -> [bool]'
    },
    testCases: [
        { code: '10 10 ==', expected: [true] },
        { code: '10 5 ==', expected: [false] },
        { code: '"a" "a" ==', expected: [true] },
    ]
};