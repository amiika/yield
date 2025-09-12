
import type { Operator, EvaluateFn } from '../../types';

export const ary: Operator = {
    definition: {
        exec: function*(s, options, evaluate: EvaluateFn) {
            const n = s.pop();
            const p = s.pop();

            if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
                throw new Error("ary expects an integer count on top of the stack.");
            }
            if (s.length < n) {
                throw new Error(`Stack underflow for ary. Expected ${n} items, but only ${s.length} available.`);
            }

            const values = s.splice(s.length - n, n);
            const tempStack = values; // Pass all values to the program at once
            yield* evaluate(p, tempStack, options);
            s.push(...tempStack);
        },
        description: 'Like `map`, but applies program P to N values taken from the stack as a single unit. `... X1..XN [P] N -> ... R...`',
        effect: '[... X1..XN [P] N] -> [... R...]'
    },
    examples: [
        { code: '20 30 (+) 2 ary', expected: [50] },
        { code: '10 20 30 (+ *) 3 ary', expected: [500] },
        { code: '10 20 30 40 (+ *) 3 ary', expected: [10, 1400] },
        { code: '1 2 () 0 ary', expected: [1, 2] },
        { code: '10 20 30 40 (+ *) 4 ary', expected: [10, 1400] },
    ]
};
