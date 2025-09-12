import type { Operator } from '../../types';
import { applyBinaryOp, isFlatList } from '../../utils';

export const divide: Operator = {
    definition: {
        exec: function*(s) { 
            const op = (a: number, b: number): number | null => b === 0 ? null : a / b;
            const identity = 1;

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
                const dividend = a ?? identity;
                const divisor = b ?? identity;
                s.push(divisor === 0 ? null : dividend / divisor);
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
        description: 'Divides two values. If a scalar and an aggregate (list/matrix) are involved, it performs broadcasting, returning a new aggregate. If two aggregates are involved, it performs a recursive, "sideways" (outer product) division, spreading flat lists back onto the stack. If only one argument is on the stack and it is a list, it reduces the list by division. Division by zero results in `null`.',
        effect: '[A B] -> [C] or [[A B C]] -> ...'
    },
    examples: [
        // Basic cases
        { code: '20 4 /', expected: [5] },
        { code: '10 0 /', expected: [null] },
        { code: '5 /', expected: [0.2] }, // 1 / 5
        { code: '/ # 1/1', expected: [1] },

        // Unary reduction
        { code: '(100 5 2) /', expected: [10]},
        { code: '(100 (5 2)) /', expected: [20, 50]},

        // Scalar Broadcasting
        { code: '(10 20) 2 /', expected: [[5, 10]] },
        { code: '20 (2 4) /', expected: [[10, 5]] },
        { code: '((10 20)(30 40)) 2 /', expected: [[[5, 10], [15, 20]]]},

        // Sideways / Outer-Product operations
        { code: '(10 20) (2 5) /', expected: [5, 2, 10, 4]},
        { code: '(10 20) (2 0) /', expected: [5, null, 10, null] },
    ]
};