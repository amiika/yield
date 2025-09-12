
import type { Operator } from '../../types';
import { yieldFormatter } from '../../utils';

export const step: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const p = s.pop();
            const l = s.pop();
            if (!Array.isArray(l)) {
                throw new Error(`step operator expects a list to iterate over, but got: ${yieldFormatter(l)}`);
            }
            for (const item of l) {
                s.push(item);
                yield* evaluate([...p], s, options);
            }
        },
        description: 'Applies a program to each element of a list, accumulating results on the main stack.',
        effect: '[A L [P]] -> ...'
    },
    examples: [
        { code: '0 (1 2 3 4) (+) step', expected: [10] },
        { code: '1 (2 3 4) (*) step', expected: [24] },
    ]
};
