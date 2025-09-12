import type { Operator, GLSLExpression } from '../../types';
import { applyBinaryOp, isFlatList, toGLSL } from '../../utils';

const isGLSLExpression = (v: any): v is GLSLExpression => v?.type === 'glsl_expression';

export const multiply: Operator = {
    definition: {
        exec: function*(s) {
            // Check for GLSL composition first, as it's a special case that works on the top two items.
            if (s.length >= 2) {
                const b = s[s.length - 1];
                const a = s[s.length - 2];
                if (isGLSLExpression(a) || isGLSLExpression(b)) {
                    s.pop();
                    s.pop();
                    const a_code = toGLSL(a);
                    const b_code = toGLSL(b);
                    s.push({
                        type: 'glsl_expression',
                        code: `(${a_code} * ${b_code})`,
                    });
                    return; // Done with GLSL case.
                }
            }
            
            const op = (a: number, b: number): number => a * b;
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

            // Handle underflow for binary case
            if (a === undefined || b === undefined) {
                s.push((a ?? 0) * (b ?? 0));
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
        description: 'Multiplies two values. If a scalar and an aggregate (list/matrix) are involved, it performs broadcasting, returning a new aggregate. If two aggregates are involved, it performs a recursive, "sideways" (outer product) multiplication, spreading flat lists back onto the stack. If only one argument is on the stack and it is a list, it reduces the list by multiplication.',
        effect: '[A B] -> [C] or [[A B C]] -> ...'
    },
    examples: [
        // Basic cases
        { code: '10 5 *', expected: [50] },
        { code: '5 *', expected: [0] },
        { code: '*', expected: [0] },

        // Unary reduction
        { code: '(2 3 4) *', expected: [24]},
        { code: '(2 (3 4)) *', expected: [6, 8]},
        { code: '() *', expected: [1] },

        // Scalar Broadcasting
        { code: '(2 3) 10 *', expected: [[20, 30]] },
        { code: '10 (2 3) *', expected: [[20, 30]] },
        { code: '((1 2)(3 4)) 10 *', expected: [[[10, 20], [30, 40]]]},

        // Sideways / Outer-Product operations
        { code: '(2 3) (4 5) *', expected: [8, 10, 12, 15]},
        { code: '(1 2 3) (4 5) *', expected: [4, 5, 8, 10, 12, 15]},
    ]
};