import type { Operator } from '../../types';

export const inOp: Operator = {
    definition: {
        exec: function*(s) { const a = s.pop(), x = s.pop(); s.push(a.includes(x)); },
        description: 'Tests if a list contains an element. Infix form.',
        effect: '[X A] -> [bool]'
    },
    examples: [
        { code: '2 [1 2 3] in', expected: [true] },
        { code: '4 [1 2 3] in', expected: [false] },
    ]
};