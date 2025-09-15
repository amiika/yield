
import type { Operator, EvaluateFn } from '../../types';
import { operatorModules } from '../index';
import { Yield } from '../../yield-interpreter';

export const chain: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            const program = s.pop();
            if (!Array.isArray(program)) {
                throw new Error('chain expects a quotation on the stack.');
            }

            const combinatorKeys = new Set([
                ...Object.keys(operatorModules.combinators.definitions),
                ...Object.keys(operatorModules.recursion.definitions)
            ]);

            const deepEvaluate: EvaluateFn = function*(prog, stack, opts) {
                const programToRun = Array.isArray(prog) ? [...prog] : [prog];

                while (programToRun.length > 0) {
                    let token = programToRun.shift();
                    
                    if (typeof token === 'string' && Yield.aliases[token]) {
                        token = Yield.aliases[token];
                    }
                    
                    const def = (typeof token === 'string' || typeof token === 'number') ? dictionary[String(token)] : undefined;
                    
                    if (def && 'body' in def && (!Array.isArray(def.body) || def.body[def.body.length-1] !== 'iterate')) {
                        // User-defined data word: recurse with deepEvaluate
                        yield* deepEvaluate(def.body, stack, opts);
                    } else if (def && 'definition' in def && combinatorKeys.has(token as string)) {
                        // Combinator: call its exec, injecting deepEvaluate as the evaluator
                        yield* def.definition.exec(stack, opts, deepEvaluate, dictionary);
                    } else {
                        // Anything else (literal, built-in non-combinator, function word): use original shallow evaluator
                        yield* evaluate([token], stack, opts);
                    }
                }
            };

            yield* deepEvaluate(program, s, options);
        },
        description: 'Deep execution combinator. Executes a program, but when it encounters a user-defined word that was defined as data (with `=`), it recursively executes the body of that word instead of pushing it to the stack. This allows for composing functions from data definitions.',
        effect: '[[P]] -> ...'
    },
    examples: [
        { 
            code: `
# Define words using '=' (as data)
(42 chr print) STAR =
((STAR) swap times) STARS =
(cr (" " print) 30 times) MARGIN =
(MARGIN STAR) BLIP =
(MARGIN 5 STARS) BAR =

# Use 'chain' to execute the final composition
(BAR BLIP BAR BLIP BLIP cr) chain
`,
            assert: s => s.length === 0,
            expectedDescription: `The letter 'F' printed with asterisks in the result panel, composed from data definitions via 'chain'.`
        }
    ]
};
