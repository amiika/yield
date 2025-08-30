import type { Operator, EvaluateFn } from '../../types';

export const binrec: Operator = {
    definition: {
        exec: function*(s, options = {}, evaluate: EvaluateFn) {
            const [join, recur, then, i_f] = [s.pop(), s.pop(), s.pop(), s.pop()];
            const binrec_recursive = function*(v, opts) {
                const cS = [v];
                yield* evaluate([...i_f], cS, opts);
                if (cS.pop()) {
                    const tS = [v];
                    yield* evaluate([...then], tS, opts);
                    return tS;
                } else {
                    const rS = [v];
                    yield* evaluate([...recur], rS, opts);
                    const v2 = rS.pop(),
                        v1 = rS.pop();
                    const res1 = yield* binrec_recursive(v1, opts);
                    const res2 = yield* binrec_recursive(v2, opts);
                    const jS = [...rS, ...res1, ...res2];
                    yield* evaluate([...join], jS, opts);
                    if (opts.isDebug) opts.onStep([...s, ...jS]);
                    return jS;
                }
            };
            const result = yield* binrec_recursive(s.pop(), options);
            s.push(...result);
        },
        description: 'Binary recursion combinator, useful for divide-and-conquer.',
        example: '# First, define fib using binrec\n[ [2 <] [] [dup pred swap pred pred] [+] binrec ] fib =\n\n# Now, call it\n8 fib',
        effect: '...'
    },
    testCases: [
        { code: '[ [2 <] [] [dup pred swap pred pred] [+] binrec ] fib = 8 fib', expected: [21] }
    ]
};