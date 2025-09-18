
import type { Operator, StackValue, LiveLoopDef } from '../../types';

export const quote: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            const name = s.pop();
            let dictKey: string;
            
            if (typeof name === 'symbol') {
                const key = Symbol.keyFor(name);
                if (!key) throw new Error(`=>: assignment to a non-global symbol is not supported.`);
                dictKey = `:${key}`;
            } else if (typeof name === 'string' || typeof name === 'number') {
                dictKey = String(name);
            } else {
                throw new Error(`Assignment target must be a name, symbol, or integer, but got: ${JSON.stringify(name)}`);
            }
            
            const value = s.pop();

            // By treating loop definitions as data to be quoted, we ensure that
            // `X until Y =>` and `(X until) Y =>` behave consistently. The `until-def`
            // object is wrapped in a quotation which, when executed, will push the
            // object onto the stack. The interpreter's `run` function then starts it.
            if (value?.type === 'live-loop-def') {
                const bodyToStore = [[value], 'iterate'];
                 dictionary[dictKey] = {
                    body: bodyToStore,
                    description: "User-defined live loop.",
                    example: "",
                };
                return;
            }

            // Case for live loops defined inside the quotation
            if (Array.isArray(value) && value.length > 0) {
                const lastEl = value[value.length - 1];

                if (lastEl === 'live' && value.length >= 2) {
                    const programQuotation = value[0];
                    const beatValue = value[1];

                    if (Array.isArray(programQuotation) && typeof beatValue === 'number') {
                        const liveLoopDef: LiveLoopDef = { type: 'live-loop-def', quotation: programQuotation, beatValue, sourceCode: value };
                        // This should also be wrapped to be consistent
                        const bodyToStore = [[liveLoopDef], 'iterate'];
                        dictionary[dictKey] = {
                            body: bodyToStore,
                            description: "User-defined live loop.",
                            example: "",
                        };
                        return;
                    }
                }
            }
            
            // --- Fallback for regular function/data definitions ---
            const quotation = Array.isArray(value) ? value : [value];
            const bodyToStore = [quotation, 'iterate'];
            dictionary[dictKey] = {
                body: bodyToStore,
                description: "User-defined function.",
                example: "",
            };
        },
        description: 'Defines a new executable word from a quotation. `P N =>` is shorthand for `((P) iterate) N =`.',
        effect: '[... P N] -> [...]'
    },
    examples: [
        { 
            replCode: ['(1 1 +) foo =>', 'foo'],
            expected: [2] 
        },
        {
            replCode: ['10 bar =>', 'bar'],
            expected: [10]
        },
        {
            replCode: ['(1 1) baz =>', 'baz'],
            expected: [1, 1]
        },
        {
            // Note: data defined with '=' that doesn't end in 'iterate' is not executable directly.
            replCode: ['(1 1) data =', 'data i'],
            expected: [1, 1]
        },
        {
            replCode: [
                '(0 (succ) yield) counter =>',
                'counter counter counter'
            ],
            expected: [1, 2, 3]
        }
    ]
};

export const curl: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            // This is syntactic sugar handled by the parser.
            // If it ever gets called directly, it's a no-op.
        },
        description: `Syntactic sugar for creating a quotation. The expression \`@ A B C\` is parsed as \`(A B C)\`. It quotes all tokens until the end of the line, or until a defining operator like '=' or '=>' is found.`,
        effect: `[... @ A B C] -> [... [A B C]]`
    },
    examples: [
        {
            code: `@ 1 2 + foo =>\nfoo`,
            expected: [3]
        }
    ]
};
