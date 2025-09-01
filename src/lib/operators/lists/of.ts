import type { Operator } from '../../types';

export const of: Operator = {
    definition: {
        exec: function*(s) { const a = s.pop(), i = s.pop(); s.push(a[i]); },
        description: 'Gets the element at a specific index. Infix form.',
        effect: '[I A] -> [X]'
    },
    examples: [
        { code: '1 [10 20 30] of', expected: [20] },
        { code: '0 "world" of', expected: ["w"] },
    ]
};