
import type { Operator, StackValue } from '../../types';

export const times: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            const n = s.pop();
            const p = s.pop();

            if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
                throw new Error("times expects an integer count on top of the stack.");
            }

            if (p === undefined) {
                 throw new Error("times expects a program on the stack.");
            }
            
            let programToRun: StackValue[];
            
            let dictKey: string | undefined;
            if (typeof p === 'symbol') {
                const key = Symbol.keyFor(p);
                if (key) dictKey = `:${key}`;
            } else if (typeof p === 'string' || typeof p === 'number') {
                dictKey = String(p);
            }
            
            const def = dictKey ? dictionary[dictKey] : undefined;

            // Case 1: The program is a word defined with `=>` (a function).
            // We just need to execute it by name.
            if (def && 'body' in def && Array.isArray(def.body) && def.body[def.body.length - 1] === 'iterate') {
                programToRun = [p];
            } 
            // Case 2: The program is a data word or a quotation.
            // We need to execute it with `iterate`.
            else {
                programToRun = Array.isArray(p) ? [...p, 'iterate'] : [p, 'iterate'];
            }

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
