
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

            // Resolve 'p' if it's a name for a data word. This allows `times`
            // to execute programs that were defined with `=`.
            let programToRun: StackValue = p;
            const pName = (typeof p === 'symbol') ? `:${Symbol.keyFor(p)}` : (typeof p === 'string' ? String(p) : '');
            if (pName && options.dictionary) {
                const def = options.dictionary[pName];
                // A function word has 'iterate' as its last token. We only want to resolve data words.
                if (def && 'body' in def && (!Array.isArray(def.body) || def.body[def.body.length - 1] !== 'iterate')) {
                    programToRun = def.body; // Use the body of the data word as the program
                }
            }
            
            const programList = Array.isArray(programToRun) ? programToRun : [programToRun];

            for (let i = 0; i < n; i++) {
                // Pass a copy of the program, because evaluate can mutate it (by shifting tokens off)
                yield* evaluate([...programList], s, options);
            }
        },
        description: 'Executes a program a specific number of times.',
        effect: '[X N [P]] -> [...]'
    },
    examples: [
        { code: '10 (2 *) 3 times', expected: [80] },
        { code: '0 (succ) 5 times', expected: [5] },
        {
            replCode: [
                '0 :state =',
                '(1 +) combinator =',
                '(:state combinator yield) :next =',
                ':next 3 times'
            ],
            expected: [1, 2, 3]
        },
        {
            replCode: `(1 +) add_one =
10 add_one 3 times`,
            expected: [13]
        }
    ]
};