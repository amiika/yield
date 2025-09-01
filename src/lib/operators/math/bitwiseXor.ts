import type { Operator } from '../../types';

export const bitwiseXor: Operator = {
    definition: {
        exec: function*(s) { const b = s.pop(), a = s.pop(); s.push((a | 0) ^ (b | 0)); },
        description: 'Bitwise XOR. Pops A and B, pushes A ^ B. Operands are treated as 32-bit integers.',
        effect: '[A B] -> [C]'
    },
    // FIX: Renamed `testCases` to `examples` to match the Operator type.
    examples: [
        { code: '5 3 ^', expected: [6] },
        { code: '7 2 ^', expected: [5] }
    ]
};