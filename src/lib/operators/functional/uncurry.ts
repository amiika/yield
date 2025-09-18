
import type { Operator, StackValue } from '../../types';

export const uncurry: Operator = {
    definition: {
        exec: function*(s) {
            const p = s.pop();
            if (!Array.isArray(p)) {
                throw new Error('uncurry expects a quotation on the stack.');
            }
            // The uncurried function will spread a list, then execute p.
            s.push(['spread', ...p]);
        },
        description: 'Converts a function that takes two separate elements into a function that takes a single list of two elements. This is a higher-order function that operates on a quotation. To uncurry a named word, use `body` first (e.g., `my-func body uncurry`).',
        effect: '[[P]] -> [[P\']]'
    },
    examples: [
        {
            replCode: [
                '# A function that expects two numbers',
                '(+) add_uncurried =>',
                '',
                '# Get the function body and uncurry it',
                'add_uncurried body uncurry :add_curried =',
                '',
                '# Use the new function with a list',
                '(5 6) :add_curried i'
            ],
            expected: [11]
        },
        {
            code: '(10 3) (-) uncurry i',
            expected: [7]
        }
    ]
};
