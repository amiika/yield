import type { Operator } from '../../types';

export const unswons: Operator = {
    definition: {
        exec: function*(s) { const l = s.pop(); if(!Array.isArray(l)) throw new Error('unswons expects a list.'); const [h, ...t] = l; s.push(t, h); },
        description: 'The reverse of `uncons`. Deconstructs a list, pushing the rest of the list and then its first element.',
        effect: '[L] -> [R E]',
    },
    examples: [
        { code: '(10 20 30) unswons', expected: [[20, 30], 10] },
        { code: '(1) unswons', expected: [[], 1] },
    ]
};