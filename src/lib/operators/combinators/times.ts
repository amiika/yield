
import type { Operator, StackValue } from '../../types';

export const times: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const n = s.pop();
            const p = s.pop();

            if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
                throw new Error("times expects an integer count on top of the stack.");
            }

            if (p === undefined) {
                 throw new Error("times expects a program on the stack.");
            }
            
            const programToRun = Array.isArray(p) ? p : [p];

            for (let i = 0; i < n; i++) {
                // Pass a copy of the program, because evaluate can mutate it (by shifting tokens off)
                yield* evaluate([...programToRun], s, options);
            }
        },
        description: 'Executes a program a specific number of times.',
        effect: '[X N [P]] -> [...]'
    },
    examples: [
        { code: '10 (2 *) 3 times', expected: [80] },
        { code: '0 (succ) 5 times', expected: [5] },
        {
            code: [
                '0 :state =',
                '(1 +) combinator =',
                '(:state combinator yield) :next =',
                ':next 3 times'
            ],
            expected: [1, 2, 3]
        }
    ]
};