import type { Operator } from '../../types';

export const whileOp: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const body = s.pop();
            const test = s.pop();
            yield* evaluate([...test], s, options);
            while (s.pop()) {
                yield* evaluate([...body], s, options);
                yield* evaluate([...test], s, options);
            }
        },
        description: 'Executes a body program as long as a test program returns true.',
        effect: '[ [B] [D] ] -> ...'
    },
    examples: [
        { code: '5 (dup 0 >) (1 -) while', expected: [0] },
        { code: '0 (false) (pop) while', expected: [0] },
    ]
};