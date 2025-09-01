import type { Operator } from '../../types';

export const equal: Operator = {
    definition: {
        exec: function*(s) { const b = s.pop(), a = s.pop(); s.push(a === b); },
        description: 'Tests for strict equality.',
        effect: '[A B] -> [bool]'
    },
    examples: [
        { code: '10 10 ==', expected: [true] },
        { code: '10 5 ==', expected: [false] },
        { code: '"a" "a" ==', expected: [true] },
    ]
};