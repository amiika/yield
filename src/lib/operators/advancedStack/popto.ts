import type { Operator } from '../../types';

export const popto: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            const name = s.pop();
            let dictKey: string;
            
            if (typeof name === 'symbol') {
                const key = Symbol.keyFor(name);
                if (!key) throw new Error(`popto: assignment to a non-global symbol is not supported.`);
                dictKey = `:${key}`;
            } else if (typeof name === 'string' || typeof name === 'number') {
                dictKey = String(name);
            } else {
                throw new Error(`Assignment target must be a name, symbol, or integer, but got: ${JSON.stringify(name)}`);
            }
            
            const value = s.pop();
            
            // All assignments create a user-defined word with a body.
            let body = Array.isArray(value) ? value : [value];

            // --- Metaprogramming for `yield` shorthands ---
            // The order of these transformations is important.

            // Step 1: Inline user-defined words used as programs for `yield`.
            // This transforms `[program state yield]` into `[[swap dupd +] state yield]`.
            if (body.length > 2 && body[body.length - 1] === 'yield') {
                const programArg = body[body.length - 3];
                let programBodyToInline = null;

                if (typeof programArg === 'string') {
                    const def = dictionary[programArg];
                    if (def && 'body' in def) {
                        programBodyToInline = def.body;
                    }
                } else if (typeof programArg === 'symbol') {
                    const key = Symbol.keyFor(programArg);
                    if (key) {
                        const dictKey = `:${key}`;
                        const def = dictionary[dictKey];
                        if (def && 'body' in def) {
                            programBodyToInline = def.body;
                        }
                    }
                }
                
                if (programBodyToInline) {
                    const newBody = [...body];
                    newBody[body.length - 3] = programBodyToInline; // Replace the name with its actual body (quotation).
                    body = newBody; // Update the working copy of the body for the next step.
                }
            }

            // Step 2: Create hidden state variables for literal states.
            // This transforms `[prog [0] yield]` or `[prog 0 yield]` into `[prog :hidden_state yield]`.
            // It can also act on the result of Step 1.
            if (body.length > 1 && body[body.length - 1] === 'yield') {
                const stateArg = body[body.length - 2];
                
                // A state argument is considered a literal if it's an array or a number, but not a symbol.
                // String arguments are treated as variable names and are not handled here.
                const isLiteralState = ! (typeof stateArg === 'symbol') && (Array.isArray(stateArg) || typeof stateArg === 'number');

                if (isLiteralState) {
                    const stateSymbol = Symbol.for(dictKey);
                    const stateSymbolKey = `:${dictKey}`;

                    // The body of the new state variable must be a list. Wrap if necessary.
                    const stateBody = Array.isArray(stateArg) ? stateArg : [stateArg];

                    // Define a new variable in the dictionary to hold the initial state.
                    dictionary[stateSymbolKey] = {
                        body: stateBody,
                        description: `Auto-generated state for '${dictKey}'`,
                        effect: '... -> ...'
                    };
                    // Modify the function's body to refer to this new state variable by its symbol.
                    const newBody = [...body];
                    newBody[body.length - 2] = stateSymbol;
                    body = newBody; // Final update to the body.
                }
            }
            
            dictionary[dictKey] = {
                body: body,
                description: "User-defined function/variable.",
                effect: '... -> ...'
            };
        },
        description: 'Pops a value and a name, then assigns the value to the name. If the value is the name of an existing operator, an alias is created. Alias: `=`. `... V N popto`',
        effect: '[... V N] -> [...]'
    },
    // FIX: Renamed `testCases` to `examples` to match the Operator type.
    examples: [
        { 
            code: ['[1 2 3 4] mylist =', 'mylist'],
            expected: [[1, 2, 3, 4]] 
        },
        {
            code: [
                '42 :mynum =',
                ':mynum'
            ],
            expected: [42]
        },
        {
            code: [
                '100 1 =',
                '1'
            ],
            expected: [100]
        }
    ]
};
