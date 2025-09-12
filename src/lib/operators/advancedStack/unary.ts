
import type { Operator, EvaluateFn } from '../../types';

export const unary: Operator = {
    definition: {
        exec: function*(s, options, evaluate: EvaluateFn) {
            const n = s.pop();
            const p = s.pop();

            if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
                throw new Error("unary expects an integer count on top of the stack.");
            }
            if (s.length < n) {
                throw new Error(`Stack underflow for unary. Expected ${n} items, but only ${s.length} available.`);
            }

            const values = s.splice(s.length - n, n);
            const allResults = [];

            for (const x of values) {
                const tempStack = [x];
                yield* evaluate(p, tempStack, options);
                allResults.push(...tempStack);
            }
            
            s.push(...allResults);
        },
        description: 'Executes the same program P on N separate values from the stack, returning N results. `... X1..XN [P] N -> ... R1..RN`',
        effect: '[... X1..XN [P] N] -> [... R1..RN]'
    },
    examples: [
        { code: '10 20 (succ) 2 unary', expected: [11, 21] },
        { code: '10 20 30 (succ) 3 unary', expected: [11, 21, 31] },
        { code: '10 20 30 40 (succ) 4 unary', expected: [11, 21, 31, 41] },
        { code: '1 0 (not) 2 unary', expected: [false, true] },
        { code: '1 2 3 () 0 unary', expected: [1, 2, 3] }
    ]
};
