import type { Operator } from '../../types';
import { applyBinaryOp, isFlatList } from '../../utils';

export const leftShift: Operator = {
    definition: {
        exec: function*(s) {
            const op = (a: number, b: number): number => (a | 0) << (b | 0);

            if (s.length < 2) throw new Error('Left shift operator requires two arguments.');
            const b = s.pop();
            const a = s.pop();
            
            const result = applyBinaryOp(op, a, b);

            // Broadcasting (scalar on aggregate) pushes the result as a single item.
            const isBroadcasting = (typeof a === 'number' && Array.isArray(b)) || (Array.isArray(a) && typeof b === 'number');
            
            if (isBroadcasting) {
                s.push(result);
            } else if (isFlatList(result)) { // Aggregate-on-aggregate spreads flat lists.
                s.push(...result);
            } else { // Pushes numbers, matrices, etc. as a single item.
                s.push(result);
            }
        },
        description: 'Bitwise left shift. Supports recursive, "sideways" (outer product) operations for lists and matrices. If a scalar and an aggregate are involved, it performs broadcasting. Operands are treated as 32-bit integers.',
        effect: '[A B] -> [C]'
    },
    examples: [
        // Basic cases
        { code: '5 1 <<', expected: [10] },

        // Scalar Broadcasting
        { code: '(5 1) 2 <<', expected: [[20, 4]] },
        { code: '2 (5 1) <<', expected: [[64, 4]] },
        { code: '((5 1)(2 8)) 1 <<', expected: [[[10, 2], [4, 16]]]},

        // Sideways / Outer-Product operations
        { code: '(5 1) (1 2) <<', expected: [10, 20, 2, 4]}
    ]
};