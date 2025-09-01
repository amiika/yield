import type { Operator } from '../../types';

export const bitwiseNot: Operator = {
    definition: {
        exec: function*(s) { s.push(~(s.pop() | 0)); },
        description: 'Bitwise NOT. Inverts the bits of the top element. The operand is treated as a 32-bit integer.',
        effect: '[A] -> [C]'
    },
    // FIX: Renamed `testCases` to `examples` to match the Operator type.
    examples: [
        { code: '5 ~', expected: [-6] },
        { code: '-1 ~', expected: [0] }
    ]
};