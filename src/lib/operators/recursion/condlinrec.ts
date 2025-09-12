import type { Operator, EvaluateFn, StackValue } from '../../types';

export const condlinrec: Operator = {
    definition: {
        exec: function*(s, options = {}, evaluate: EvaluateFn) {
            const cases = s.pop() as StackValue[][];

            const condlinrec_recursive = function*(opts) {
                for (const caseItem of cases) {
                    if (!Array.isArray(caseItem) || caseItem.length < 2) continue;

                    const test = caseItem[0];
                    const testStack = [...s];
                    yield* evaluate(test, testStack, opts);
                    
                    if (testStack.pop()) {
                        // This case matches
                        if (caseItem.length === 2) {
                            // Terminal case: [[B] [T]]
                            const then = caseItem[1];
                            yield* evaluate(then, s, opts);
                        } else {
                            // Recursive case: [[B] [R1] [R2]]
                            const [_, r1, r2] = caseItem;
                            yield* evaluate(r1, s, opts);
                            yield* condlinrec_recursive(opts); // Recurse
                            yield* evaluate(r2, s, opts);
                        }
                        return; // Exit after first match
                    }
                }
            };
            
            yield* condlinrec_recursive(options);
        },
        description: 'Conditional linear recursion. Takes a list of cases `[[B T] or [B R1 R2]...]`. Finds the first true B. If a `[T]` branch, executes T. If a `[R1 R2]` branch, executes R1, recurses, then executes R2.',
        effect: '[... [Cases]] -> [...]'
    },
    examples: [
        { 
            code: `# Factorial with condlinrec
5 ( 
    ( (dup 0 ==) (pop 1) )
    ( (true) (dup pred) (*) )
) condlinrec`, 
            expected: [120] 
        },
        {
            code: `1 ( 
                ( (dup 0 ==) (pop 1) )
                ( (true) (dup pred) (*) )
            ) condlinrec`, 
            expected: [1] 
        }
    ]
};