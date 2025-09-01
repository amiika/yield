import type { Operator } from '../../types';

export const ifte: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const f = s.pop();
            const t = s.pop();
            yield* evaluate(s.pop() ? t : f, s, options);
        },
        description: 'If-then-else. [B] [T] [F] ifte. If B is true, executes T, else executes F.',
        effect: '[B [T] [F]] -> ...'
    },
    examples: [
        { code: 'true [1] [2] ifte', expected: [1] },
        { code: 'false [1] [2] ifte', expected: [2] },
        { code: '1 0 > ["yes"] ["no"] ifte', expected: ["yes"] },
    ]
};