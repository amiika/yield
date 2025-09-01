import type { Operator } from '../../types';

export const leftShift: Operator = {
    definition: {
        exec: function*(s) { const b = s.pop(), a = s.pop(); s.push((a | 0) << (b | 0)); },
        description: 'Bitwise left shift. Pops A and B, pushes A << B. Operands are treated as 32-bit integers.',
        effect: '[A B] -> [C]'
    },
    // FIX: Renamed `testCases` to `examples` to match the Operator type.
    examples: [
        { code: '5 1 <<', expected: [10] },
        { code: '1 8 <<', expected: [256] }
    ]
};