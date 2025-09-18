
import type { Operator } from '../../types';

export const zip: Operator = {
    definition: {
        exec: function*(s) {
            const listB = s.pop();
            const listA = s.pop();

            if (!Array.isArray(listA) || !Array.isArray(listB)) {
                throw new Error('zip expects two lists on the stack.');
            }

            const result = [];
            const minLength = Math.min(listA.length, listB.length);

            for (let i = 0; i < minLength; i++) {
                result.push([listA[i], listB[i]]);
            }

            s.push(result);
        },
        description: 'Combines two lists element-wise into a new list of pairs. The operation stops when the shorter list is exhausted.',
        effect: '[L1 L2] -> [L3]'
    },
    examples: [
        {
            code: '(1 2 3) (6 5 4) zip',
            expected: [[[1, 6], [2, 5], [3, 4]]]
        },
        {
            code: '(1 2) (10 20 30) zip',
            expected: [[[1, 10], [2, 20]]]
        },
        {
            code: '(1 2 3) (10 20) zip',
            expected: [[[1, 10], [2, 20]]]
        },
        {
            code: '(1 2 3) () zip',
            expected: [[]]
        },
        {
            code: '() (1 2 3) zip',
            expected: [[]]
        },
        {
            code: '() () zip',
            expected: [[]]
        },
        {
            code: '1 2 zip',
            expectedError: 'zip expects two lists on the stack.'
        }
    ]
};
