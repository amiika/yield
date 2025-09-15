import type { Operator } from '../../types';

export const print: Operator = {
    definition: {
        exec: function*(s, options) {
            const output = String(s.pop());
            if (options.onOutput) {
                options.onOutput(output);
            } else {
                console.log(output); // Fallback
            }
        },
        description: 'Outputs the top of the stack to the REPL.',
        effect: '[S] -> []'
    },
    examples: [
        { code: '"Hello" print', expected: [] }
    ]
};