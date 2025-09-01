import type { Operator } from '../../types';

export const bitwiseOr: Operator = {
    definition: {
        exec: function*(s) { const b = s.pop(), a = s.pop(); s.push((a | 0) | (b | 0)); },
        description: 'Bitwise OR. Pops A and B, pushes A | B. Operands are treated as 32-bit integers.',
        effect: '[A B] -> [C]'
    },
    // FIX: Renamed `testCases` to `examples` to match the Operator type.
    examples: [
        { code: '5 2 |', expected: [7] },
        { code: '4 1 |', expected: [5] }
    ]
};