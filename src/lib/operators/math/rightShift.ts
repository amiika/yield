import type { Operator } from '../../types';

export const rightShift: Operator = {
    definition: {
        exec: function*(s) { const b = s.pop(), a = s.pop(); s.push((a | 0) >> (b | 0)); },
        description: 'Bitwise (sign-propagating) right shift. Pops A and B, pushes A >> B. Operands are treated as 32-bit integers.',
        example: '10 1 >>',
        effect: '[A B] -> [C]'
    },
    testCases: [
        { code: '10 1 >>', expected: [5] },
        { code: '-10 1 >>', expected: [-5] },
        { code: '255 4 >>', expected: [15] }
    ]
};