import type { Operator } from '../../types';

export const uncons: Operator = {
    definition: {
        exec: function*(s) { const l = s.pop(); if(!Array.isArray(l)) throw new Error('uncons expects a list.'); const [h, ...t] = l; s.push(t, h); },
        description: 'Deconstructs a list into its first element and the rest of the list.',
        example: '[10 20 30] uncons',
        effect: '[A] -> [F R]'
    },
    testCases: [
        { code: '[10 20 30] uncons', expected: [[20, 30], 10] },
        { code: '["a"] uncons', expected: [[], "a"] },
    ]
};
