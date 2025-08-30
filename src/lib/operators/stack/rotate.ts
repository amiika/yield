import type { Operator } from '../../types';

export const rotate: Operator = {
    definition: {
        exec: function*(s) { const z = s.pop(), y = s.pop(), x = s.pop(); s.push(z, y, x); },
        description: 'Rotates the top three stack items.',
        example: '1 2 3 rotate',
        effect: '[X Y Z] -> [Z Y X]'
    },
    testCases: [
        { code: '1 2 3 rotate', expected: [3, 2, 1] },
        { code: '"a" "b" "c" rotate', expected: ['c', 'b', 'a'] },
    ]
};