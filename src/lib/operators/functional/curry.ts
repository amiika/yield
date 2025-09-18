
import type { Operator, StackValue } from '../../types';

export const curry: Operator = {
    definition: {
        exec: function*(s) {
            const p = s.pop();
            if (!Array.isArray(p)) {
                throw new Error('curry expects a quotation on the stack.');
            }
            // The curried function will take 2 items, make a vec, then execute p on it.
            s.push([2, 'vec', p, 'i']);
        },
        description: 'Converts a function that takes a list of two elements into a function that takes two separate elements. This is a higher-order function that operates on a quotation. To curry a named word, use `body` first (e.g., `my-func body curry`).',
        effect: '[[P]] -> [[P\']]'
    },
    examples: [
        {
            replCode: [
                '# A function that expects a list of two numbers',
                '(spread *) mul_pair =>',
                '',
                '# Get the function body and curry it',
                'mul_pair body curry :mul_curried =',
                '',
                '# Use the new curried function',
                '3 4 :mul_curried i'
            ],
            expected: [12]
        },
        {
            code: '5 6 (spread +) curry i',
            expected: [11]
        }
    ]
};
