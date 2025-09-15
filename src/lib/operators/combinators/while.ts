
import type { Operator } from '../../types';

export const whileOp: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const body = s.pop();
            const test = s.pop();
            yield* evaluate([...test], s, options);
            while (s.pop()) {
                yield* evaluate([...body], s, options);
                yield* evaluate([...test], s, options);
            }
        },
        description: 'Executes a body program as long as a test program returns true.',
        effect: '[ [B] [D] ] -> ...'
    },
    examples: [
        {
            code: '0 (dup 5 <) (succ) while',
            expected: [5],
            expectedDescription: 'A simple counter from 0 up to 5.'
        },
        {
            code: '0 5 (dup 0 >) (swap over + swap 1 -) while pop',
            expected: [15],
            expectedDescription: 'Calculates the sum of numbers from 5 down to 1.'
        },
        {
            code: [
                '() :nums =',
                '5 (dup 0 >) (dup :nums <- pred) while pop',
                ':nums'
            ],
            expected: [[5, 4, 3, 2, 1]],
            expectedDescription: 'Collects countdown values into a list variable.'
        },
        {
            code: '6 (dup 1 >) (dup 2 % 0 == (2 /) (3 * 1 +) ?) while',
            expected: [1],
            expectedDescription: 'Calculates a Collatz sequence, demonstrating `while` with an `ifte` (?) condition in its body.'
        }
    ]
};