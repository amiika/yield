import type { Operator, EvaluateFn } from '../../types';

export const genrec: Operator = {
    definition: {
        exec: function*(s, options = {}, evaluate: EvaluateFn) {
            const [rec2, rec1, then, test] = [s.pop(), s.pop(), s.pop(), s.pop()];

            const genrec_recursive = function*(opts) {
                const testStack = [...s];
                yield* evaluate(test, testStack, opts);

                if (testStack.pop()) {
                    // Base case
                    yield* evaluate(then, s, opts);
                } else {
                    // Recursive step
                    yield* evaluate(rec1, s, opts);
                    // Push the recursive call bundle
                    const recursiveCall = [test, then, rec1, rec2, 'genrec'];
                    s.push(recursiveCall);
                    yield* evaluate(rec2, s, opts);
                }
            };
            
            yield* genrec_recursive(options);
        },
        description: 'General recursion. `[B] [T] [R1] [R2] genrec`. Executes B. If true, executes T. Else, executes R1, pushes the recursive call, then executes R2.',
        effect: '[... [B] [T] [R1] [R2]] -> [...]'
    },
    examples: [
        { 
            code: '5 [ [dup 0 <=] [pop 1] [dup pred] [i *] genrec ] i',
            expected: [120] 
        },
        {
            code: [
                '[ [dup 0 ==] [pop 1] [dup pred] [i *] genrec ] fac =',
                '5 fac'
            ],
            expected: [120]
        }
    ]
};