import type { Operator } from '../../types';

export const notEqual: Operator = {
    definition: {
        exec: function*(s) { const b = s.pop(), a = s.pop(); s.push(a != b); },
        description: 'Tests for inequality.',
        effect: '[A B] -> [bool]'
    },
    examples: [
        { code: '5 10 !=', expected: [true] },
        { code: '10 10 !=', expected: [false] },
        { code: '"a" "b" !=', expected: [true] },
    ]
};