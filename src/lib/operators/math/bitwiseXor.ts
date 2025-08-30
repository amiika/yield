import type { Operator } from '../../types';

export const bitwiseXor: Operator = {
    definition: {
        exec: function*(s) { const b = s.pop(), a = s.pop(); s.push((a | 0) ^ (b | 0)); },
        description: 'Bitwise XOR. Pops A and B, pushes A ^ B. Operands are treated as 32-bit integers.',
        example: '5 3 ^',
        effect: '[A B] -> [C]'
    },
    testCases: [
        { code: '5 3 ^', expected: [6] },
        { code: '7 2 ^', expected: [5] }
    ]
};