import type { Operator, EvaluateFn } from '../../types';

export const tailrec: Operator = {
    definition: {
        exec: function*(s, options = {}, evaluate: EvaluateFn) {
            const [recurse, then, test] = [s.pop(), s.pop(), s.pop()];

            const tailrec_recursive = function*(opts) {
                // Execute test on a copy of the stack
                const testStack = [...s];
                yield* evaluate(test, testStack, opts);

                if (testStack.pop()) {
                    // Base case: test is true, execute then
                    yield* evaluate(then, s, opts);
                } else {
                    // Recursive step: test is false, execute recurse then loop
                    yield* evaluate(recurse, s, opts);
                    yield* tailrec_recursive(opts);
                }
            };

            yield* tailrec_recursive(options);
        },
        description: 'Tail recursion. Executes [T]est. If true, executes [Th]en. Else executes [R]ecurse and loops. `[... [T] [Th] [R]] tailrec`',
        example: `# Factorial (tail-recursive)
# Stack state is [N Acc]
[ [swap popd dup 1 <=] [popd] [dupd swapd * swap pred swap] tailrec ] fac =

5 1 fac`,
        effect: '[... [T] [Th] [R]] -> [...]'
    },
    testCases: [
        { 
            code: [
                `# Tail-recursive factorial setup`,
                `# Stack state is [N Acc]`,
                `[ [swap popd dup 1 <=] [popd] [dupd swapd * swap pred swap] tailrec ] fac =`,
                `5 1 fac`
            ], 
            expected: [120] 
        },
        {
            code: [
                `# Find the last element of a list`,
                `[ [rest null?] [first] [rest] tailrec ] last =`,
                `[1 2 3 4 5] last`
            ],
            expected: [5]
        }
    ]
};