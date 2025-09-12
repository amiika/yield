import type { Operator } from '../../types';
import { applyBinaryOp, isFlatList } from '../../utils';

export const atan2: Operator = {
    definition: {
        exec: function*(s) { 
            const op = (a: number, b: number): number => Math.atan2(a, b);

            if (s.length < 2) throw new Error('atan2 operator requires two arguments.');
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
        description: 'Arctangent of a quotient (y/x). Supports recursive, "sideways" (outer product) operations for lists and matrices. If a scalar and an aggregate are involved, it performs broadcasting.',
        effect: '[Y X] -> [C]'
    },
    examples: [
        // Basic cases
        { code: '1 1 atan2', expected: [0.7853981633974483] },
        { code: '10 5 atan2', assert: (s) => s.length === 1 && typeof s[0] === 'number', expectedType: 'number' },

        // Scalar Broadcasting
        { code: '(10 20) 5 atan2', expected: [[ 1.1071487177940904, 1.3258176636680326 ]] },
        { code: '10 (5 10) atan2', expected: [[ 1.1071487177940904, 0.7853981633974483 ]]},

        // Sideways / Outer-Product operations
        { code: '(1 10) (1 5) atan2', assert: s => s.length === 4, expectedDescription: 'Four float results on the stack.'}
    ]
};