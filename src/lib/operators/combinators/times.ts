import type { Operator } from '../../types';

export const times: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const n = s.pop();
            let p = s.pop();
            if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
                throw new Error("times expects an integer count on top of the stack.");
            }
            let programToRun = Array.isArray(p) ? p : [p];
            for (let i = 0; i < n; i++) {
                yield* evaluate([...programToRun], s, options);
            }
        },
        description: 'Executes a program a specific number of times.',
        effect: '[X N [P]] -> [...]'
    },
    examples: [
        { code: '10 [2 *] 3 times', expected: [80] },
        { code: '0 [succ] 5 times', expected: [5] },
                {
            code: [
                '0 state =',
                '[1 +] combinator =',
                '[combinator state yield] next =',
                '[next] 3 times'
            ],
            expected: [1, 2, 3]
        }
    ]
};