import type { Operator } from '../../types';
import { applyBinaryOp, isFlatList } from '../../utils';

export const bitwiseOr: Operator = {
    definition: {
        exec: function*(s) {
            const op = (a: number, b: number): number => (a | 0) | (b | 0);
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

            if (s.length < 2) throw new Error('Bitwise OR operator requires two arguments.');
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
        description: 'Bitwise OR. If a scalar and an aggregate are involved, it performs broadcasting. If two aggregates are involved, it performs a "sideways" operation. If a single list is provided, it reduces the list. Operands are treated as 32-bit integers.',
        effect: '[A B] -> [C] or [[A B C]] -> ...'
    },
    examples: [
        // Basic cases
        { code: '5 2 |', expected: [7] },

        // Unary reduction
        { code: '(1 2 4) |', expected: [7]},
        { code: '() |', expected: [0] },

        // Scalar Broadcasting
        { code: '(5 4) 1 |', expected: [[5, 5]] },
        { code: '1 (5 4) |', expected: [[5, 5]] },
        { code: '((5 4)(2 1)) 1 |', expected: [[[5, 5], [3, 1]]]},

        // Sideways / Outer-Product operations
        { code: '(1 2) (4 8) |', expected: [5, 9, 6, 10]},
    ]
};