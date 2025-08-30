import type { Operator } from '../../types';

export const i: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const p = s.pop();
            yield* evaluate(Array.isArray(p) ? p : [p], s, options);
        },
        description: 'Executes a program (quotation) from the stack.',
        example: '[1 1 +] i',
        effect: '[[P]] -> ...'
    },
    testCases: [
        { code: '[1 1 +] i', expected: [2] },
        { code: '[1 2 +] i', expected: [3] },
        { code: '[i] meh = [1 1 +] meh', expected: [2] }
    ]
};