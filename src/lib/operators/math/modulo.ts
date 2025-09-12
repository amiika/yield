import type { Operator } from '../../types';
import { applyBinaryOp, isFlatList } from '../../utils';

export const modulo: Operator = {
    definition: {
        exec: function*(s) {
            const op = (a: number, b: number): number => b === 0 ? 0 : a % b;
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
            
            // Handle underflow
            if (a === undefined || b === undefined) {
                s.push(op(a ?? 0, b ?? 1));
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
        description: 'Performs the modulo operation. If a scalar and an aggregate are involved, it performs broadcasting. If two aggregates are involved, it performs a "sideways" operation. If a single list is provided, it reduces the list.',
        effect: '[A B] -> [C] or [[A B C]] -> ...'
    },
    examples: [
        // Basic cases
        { code: '10 3 %', expected: [1] },
        { code: '10 0 %', expected: [0] },
        { code: '10 %', expected: [0] },

        // Unary reduction
        { code: '(10 4 3) %', expected: [2]},
        { code: '(10 (11 12)) %', expected: [10 % 11, 10 % 12]},

        // Scalar Broadcasting
        { code: '(10 11) 3 %', expected: [[1, 2]] },
        { code: '10 (3 4) %', expected: [[1, 2]] },
        { code: '((10 11)(12 13)) 3 %', expected: [[[1, 2], [0, 1]]]},

        // Sideways / Outer-Product operations
        { code: '(10 11) (3 4) %', expected: [1, 2, 2, 3]},
    ]
};