import type { Operator } from '../../types';
import { applyBinaryOp, isFlatList } from '../../utils';

export const bitwiseAnd: Operator = {
    definition: {
        exec: function*(s) {
            const op = (a: number, b: number): number => (a | 0) & (b | 0);
            const identity = -1; // All bits set

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

            if (s.length < 2) throw new Error('Bitwise AND operator requires two arguments.');
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
        description: 'Bitwise AND. If a scalar and an aggregate are involved, it performs broadcasting. If two aggregates are involved, it performs a "sideways" operation. If a single list is provided, it reduces the list. Operands are treated as 32-bit integers.',
        effect: '[A B] -> [C] or [[A B C]] -> ...'
    },
    examples: [
        // Basic cases
        { code: '6 3 &', expected: [2] },

        // Unary reduction
        { code: '(6 3 2) &', expected: [2]},
        { code: '() &', expected: [-1] },
        
        // Scalar Broadcasting
        { code: '(6 5) 3 &', expected: [[2, 1]] },
        { code: '3 (6 5) &', expected: [[2, 1]] },
        { code: '((6 5)(1 15)) 3 &', expected: [[[2, 1], [1, 3]]]},

        // Sideways / Outer-Product operations
        { code: '(7 15) (3 5) &', expected: [3, 5, 3, 5]}
    ]
};