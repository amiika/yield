import type { Operator } from '../../types';
import { applyBinaryOp, isFlatList } from '../../utils';

export const subtract: Operator = {
    definition: {
        exec: function*(s) {
            const op = (a: number, b: number): number => a - b;
            const identity = 0;

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
            
            // Handle underflow for binary case
            if (a === undefined || b === undefined) {
                s.push((a ?? 0) - (b ?? 0));
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
        description: 'Subtracts two values. If a scalar and an aggregate (list/matrix) are involved, it performs broadcasting, returning a new aggregate. If two aggregates are involved, it performs a recursive, "sideways" (outer product) subtraction, spreading flat lists back onto the stack. If only one argument is on the stack and it is a list, it reduces the list by subtraction.',
        effect: '[A B] -> [C] or [[A B C]] -> ...'
    },
    examples: [
        // Basic cases
        { code: '30 10 -', expected: [20] },
        { code: '10 -', expected: [-10] },
        { code: '-', expected: [0] },

        // Unary reduction
        { code: '(10 5 2) -', expected: [3]},
        { code: '(10 (5 6)) -', expected: [5, 4]},

        // Scalar Broadcasting
        { code: '(10 20) 5 -', expected: [[5, 15]] },
        { code: '100 (10 20) -', expected: [[90, 80]] },
        { code: '((10 20)(30 40)) 5 -', expected: [[[5, 15], [25, 35]]]},

        // Sideways / Outer-Product operations
        { code: '(10 20) (1 2) -', expected: [9, 8, 19, 18]},
        { code: '(5 1) (2 3) -', expected: [3, 2, -1, -2] },
    ]
};