import type { Operator, EvaluateFn } from '../../types';

export const primrec: Operator = {
    definition: {
        exec: function*(s, options = {}, evaluate: EvaluateFn) {
            const [combine, initial] = [s.pop(), s.pop()];
            const data = s.pop();

            const primrec_recursive = function*(val, opts) {
                if ((typeof val === 'number' && val <= 0) || (Array.isArray(val) && val.length === 0)) {
                    // Base case
                    yield* evaluate(initial, s, opts);
                } else {
                    if (typeof val === 'number') {
                        // Integer recursion
                        yield* primrec_recursive(val - 1, opts);
                        s.push(val);
                        yield* evaluate(combine, s, opts);
                    } else {
                        // List recursion
                        const [first, ...rest] = val;
                        yield* primrec_recursive(rest, opts);
                        s.push(first);
                        yield* evaluate(combine, s, opts);
                    }
                }
            };
            
            s.length = 0; // Clear the stack for the result
            yield* primrec_recursive(data, options);
        },
        description: 'Primitive recursion. Executes [I] for 0 or empty list. For N > 0, executes N-1 primrec, then combines with N via [C]. For lists, recurses on rest, then combines with first via [C].',
        example: '5 [1] [*] primrec  # Factorial\n[1 2 3] 0 [+] primrec # Sum',
        effect: '[X [I] [C]] -> [R]'
    },
    testCases: [
        { 
            code: '5 [1] [*] primrec', 
            expected: [120] 
        },
        { 
            code: '[1 2 3 4] 0 [+] primrec', 
            expected: [10] 
        }
    ]
};