import type { Operator } from '../../types';

export const dupd: Operator = {
    definition: {
        exec: function*(s) { const y = s.pop(); s.push(s[s.length-1], y); },
        description: 'Like dup, but duplicates the second element on the stack.',
        example: '1 2 3 dupd',
        effect: '[X Y] -> [X X Y]'
    },
    testCases: [
        { code: '1 2 3 dupd', expected: [1, 2, 2, 3] },
        { code: '"a" "b" dupd', expected: ['a', 'a', 'b'] },
    ]
};