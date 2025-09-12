import type { Operator } from '../../types';
import { applyBinaryOp, isFlatList } from '../../utils';

export const rightShift: Operator = {
    definition: {
        exec: function*(s) {
            const op = (a: number, b: number): number => (a | 0) >> (b | 0);
            
            if (s.length < 2) throw new Error('Right shift operator requires two arguments.');
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
        description: 'Bitwise (sign-propagating) right shift. Supports recursive, "sideways" (outer product) operations for lists and matrices. If a scalar and an aggregate are involved, it performs broadcasting. Operands are treated as 32-bit integers.',
        effect: '[A B] -> [C]'
    },
    examples: [
        // Basic cases
        { code: '10 1 >>', expected: [5] },

        // Scalar Broadcasting
        { code: '(10 255) 1 >>', expected: [[5, 127]] },
        { code: '255 (1 4) >>', expected: [[127, 15]] },
        { code: '((10 255)(-10 1)) 1 >>', expected: [[[5, 127], [-5, 0]]]},

        // Sideways / Outer-Product operations
        { code: '(10 255) (1 2) >>', expected: [5, 2, 127, 63]},
    ]
};