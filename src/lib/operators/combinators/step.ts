import type { Operator } from '../../types';

export const step: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const [p, l] = [s.pop(), s.pop()];
            for (const item of l) {
                s.push(item);
                yield* evaluate([...p], s, options);
            }
        },
        description: 'Applies a program to each element of a list, accumulating results on the main stack.',
        example: '0 [1 2 3 4] [+] step',
        effect: '[A L [P]] -> ...'
    },
    testCases: [
        { code: '0 [1 2 3 4] [+] step', expected: [10] },
        { code: '1 [2 3 4] [*] step', expected: [24] },
    ]
};