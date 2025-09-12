import type { Operator } from '../../types';

export const uncons: Operator = {
    definition: {
        exec: function*(s) { const l = s.pop(); if(!Array.isArray(l)) throw new Error('uncons expects a list.'); const [h, ...t] = l; s.push(h, t); },
        description: 'Deconstructs a list, pushing its first element and then the rest of the list.',
        effect: '[L] -> [E R]',
    },
    examples: [
        { code: '(10 20 30) uncons', expected: [10, [20, 30]] },
        { code: '("a") uncons', expected: ["a", []] },
    ]
};