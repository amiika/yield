import type { Operator } from '../../types';
import { applyBinaryOp, isFlatList } from '../../utils';

export const pow: Operator = {
    definition: {
        exec: function*(s) {
            const op = (a: number, b: number): number => Math.pow(a, b);

            // UNARY REDUCTION
            if (s.length === 1 && Array.isArray(s[0])) {
                const list = s.pop() as any[];
                if (list.length === 0) {
                    throw new Error('pow with a single empty list is not supported.');
                }
                const [first, ...rest] = list;
                const result = rest.reduce((acc, curr) => applyBinaryOp(op, acc, curr), first);
                
                if (isFlatList(result)) s.push(...result);
                else s.push(result);
                return;
            }

            if (s.length < 2) throw new Error('pow operator requires two arguments.');
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
        description: 'Raises A to the power of B. If a scalar and an aggregate are involved, it performs broadcasting. If two aggregates are involved, it performs a "sideways" operation. If a single list is provided, it reduces the list.',
        effect: '[A B] -> [C] or [[A B C]] -> ...'
    },
    examples: [
        // Basic cases
        { code: '2 8 pow', expected: [256]},

        // Unary reduction
        { code: '(2 3 2) pow', expected: [64]},
        { code: '(4 (3 2)) pow', expected: [64, 16] },

        // Scalar Broadcasting
        { code: '(2 3) 2 pow', expected: [[4, 9]] },
        { code: '2 (8 3) pow', expected: [[256, 8]] },
        { code: '((2 3)(4 5)) 2 pow', expected: [[[4, 9], [16, 25]]]},

        // Sideways / Outer-Product operations
        { code: '(2 3) (2 4) pow', expected: [4, 16, 9, 81]},
    ]
};