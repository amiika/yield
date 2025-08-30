import type { Operator } from '../../types';

export const first: Operator = {
    definition: {
        exec: function*(s) { s.push(s.pop()[0]); },
        description: 'Gets the first element of a list.',
        example: '[10 20 30] first',
        effect: '[[A B]] -> [A]'
    },
    testCases: [
        { code: '[10 20 30] first', expected: [10] },
        { code: '[[1 2] 3] first', expected: [[1, 2]] },
    ]
};