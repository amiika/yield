import type { Operator } from '../../types';

export const bitwiseAnd: Operator = {
    definition: {
        exec: function*(s) { const b = s.pop(), a = s.pop(); s.push((a | 0) & (b | 0)); },
        description: 'Bitwise AND. Pops A and B, pushes A & B. Operands are treated as 32-bit integers.',
        example: '6 3 &',
        effect: '[A B] -> [C]'
    },
    testCases: [
        { code: '6 3 &', expected: [2] },
        { code: '5 9 &', expected: [1] },
        { code: '-1 1 &', expected: [1] }
    ]
};