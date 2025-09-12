
import type { Operator } from '../../types';

export const iterate: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const p = s.pop();
            yield* evaluate(Array.isArray(p) ? p : [p], s, options);
        },
        description: 'Executes a program (quotation) from the stack. Alias: `i`.',
        effect: '[[P]] -> ...'
    },
    examples: [
        { code: '(1 1 +) iterate', expected: [2] },
        { code: '(1 2 +) i', expected: [3] },
        { code: '(iterate) meh => (1 1 +) meh', expected: [2] }
    ]
};
