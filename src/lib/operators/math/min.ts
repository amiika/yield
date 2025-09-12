import type { Operator } from '../../types';
import { applyBinaryOp, isFlatList } from '../../utils';

export const min: Operator = {
    definition: {
        exec: function*(s) {
            const op = (a: number, b: number): number => Math.min(a, b);
            const identity = Infinity;

            // UNARY REDUCTION
            if (s.length === 1 && Array.isArray(s[0])) {
                const list = s.pop() as any[];
                if (list.length === 0) {
                    s.push(identity);
                    return;
                }
                const [first, ...rest] = list;
                const result = rest.reduce((acc, curr) => applyBinaryOp(op, acc, curr), first);
                
                if (isFlatList(result)) s.push(...result);
                else s.push(result);
                return;
            }
            
            const b = s.pop();
            const a = s.pop();

            // Handle underflow
            if (a === undefined || b === undefined) {
                s.push(Math.min(a ?? 0, b ?? 0));
                return;
            }
            
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
        description: 'Pushes the minimum of two values. If a scalar and an aggregate are involved, it performs broadcasting. If two aggregates are involved, it performs a "sideways" operation. If a single list is provided, it finds the minimum value in the list.',
        effect: '[A B] -> [N] or [[A B C]] -> ...'
    },
    examples: [
        // Basic cases
        { code: '10 20 min', expected: [10] },
        { code: '10 min', expected: [0] },
        { code: 'min', expected: [0] },

        // Unary reduction
        { code: '(-10 50 2) min', expected: [-10]},
        { code: '((1 100) (50 2)) min', expected: [1, 1, 50, 2]},
        { code: '(10 (20 5)) min', expected: [10, 5]},
        { code: '() min', expected: [Infinity] },

        // Scalar Broadcasting
        { code: '(10 20) 15 min', expected: [[10, 15]] },
        { code: '50 ((1 100)(50 2)) min', expected: [[[1, 50], [50, 2]]]},

        // Sideways / Outer-Product operations
        { code: '(10 2) (5 20) min', expected: [5, 10, 2, 2]},
    ]
};