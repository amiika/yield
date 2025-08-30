import type { Operator } from '../../types';

export const dup: Operator = {
    definition: {
        exec: function*(s) { s.push(s[s.length - 1]); },
        description: 'Duplicates the top element of the stack.',
        example: '10 dup',
        effect: '[X] -> [X X]'
    },
    testCases: [
        { code: '10 dup', expected: [10, 10] },
        { code: '[1 2] dup', expected: [[1, 2], [1, 2]] },
    ]
};