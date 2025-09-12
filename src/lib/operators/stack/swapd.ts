import type { Operator } from '../../types';

export const swapd: Operator = {
    definition: {
        exec: function*(s) { const c = s.pop(), b = s.pop(), a = s.pop(); s.push(b, a, c); },
        description: 'Like swap, but swaps the second and third elements.',
        effect: '[X Y Z] -> [Y X Z]'
    },
    examples: [
        { code: '10 20 30 swapd', expected: [20, 10, 30] },
        { code: '1 (2) 3 swapd', expected: [[2], 1, 3] },
    ]
};