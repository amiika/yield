import type { Operator } from '../../types';

export const swap: Operator = {
    definition: {
        exec: function*(s) { s.push(s.pop(), s.pop()); },
        description: 'Swaps the top two elements of the stack.',
        effect: '[X Y] -> [Y X]'
    },
    examples: [
        { code: '10 20 swap', expected: [20, 10] },
        { code: 'true (1) swap', expected: [[1], true] },
    ]
};