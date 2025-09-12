import type { Operator } from '../../types';

export const branch: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const f = s.pop();
            const t = s.pop();
            const b = s.pop();
            if (b) {
                yield* evaluate(t, s, options);
            } else {
                yield* evaluate(f, s, options);
            }
        },
        description: 'If the boolean B is true, executes T, otherwise executes F.',
        effect: '[B [T] [F]] -> ...'
    },
    examples: [
        { code: '10 5 > ("Greater") ("Not Greater") branch', expected: ["Greater"] },
        { code: '5 10 > ("Greater") ("Not Greater") branch', expected: ["Not Greater"] }
    ]
};