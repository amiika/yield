import type { Operator, EvaluateFn } from '../../types';

export const linrec: Operator = {
    definition: {
        exec: function*(s, options = {}, evaluate: EvaluateFn) {
            const [after, recur, then, i_f] = [s.pop(), s.pop(), s.pop(), s.pop()];
            const linrec_recursive = function*(v, opts) {
                const cS = [v];
                yield* evaluate([...i_f], cS, opts);
                if (cS.pop()) {
                    const tS = [v];
                    yield* evaluate([...then], tS, opts);
                    return tS;
                } else {
                    const pS = [v];
                    yield* evaluate([...recur], pS, opts);
                    const nV = pS.pop();
                    const aO = [...pS];
                    const rR = yield* linrec_recursive(nV, opts);
                    const aS = [...aO, ...rR];
                    yield* evaluate([...after], aS, opts);
                    if (opts.isDebug) opts.onStep([...s, ...aS]);
                    return aS;
                }
            };
            const result = yield* linrec_recursive(s.pop(), options);
            s.push(...result);
        },
        description: 'Linear recursion combinator.',
        effect: '...'
    },
    examples: [
        { code: '((null?) (succ) (dup pred) (*) linrec) fac => 5 fac', expected: [120] },
        { code: '5 ((null?) (succ) (dup pred) (*) linrec) i', expected: [120] },
    ]
};
