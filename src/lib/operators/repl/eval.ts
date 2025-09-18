
import type { Operator, EvaluateFn } from '../../types';

export const evalOp: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const code = s.pop();
            let program;

            if (typeof code === 'string') {
                if (!options.parse) {
                    throw new Error('eval requires the parse context.');
                }
                program = options.parse(code);
                // If the parsed program is a list containing a single list (a quotation),
                // execute the inner list directly. This makes `eval` more robust.
                if (Array.isArray(program) && program.length === 1 && Array.isArray(program[0])) {
                    program = program[0];
                }
            } else if (Array.isArray(code)) {
                program = code;
            } else {
                s.push(code); // push back unknown type
                throw new Error('eval expects a string or quotation of code.');
            }
            
            yield* evaluate(program, s, options);
        },
        description: 'Parses and executes a string or quotation of Yield code.',
        effect: '[S_code|L_quotation] -> [...]'
    },
    examples: [
        { 
            code: '"1 2 +" eval', 
            expected: [3] 
        },
        {
            replCode: [
                '(dup *) square_func =', // Note: defined as data, not a function
                '5 square_func eval'
            ],
            expected: [25]
        }
    ]
};