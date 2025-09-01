import type { Operator } from '../../types';

export const unswons: Operator = {
    definition: {
        exec: function*(s) { const [h, ...t] = s.pop(); s.push(h, t); },
        description: 'The reverse of `uncons`. Deconstructs a list into its first element and the rest of the list. `A -> R F`',
        effect: '[L] -> [E L\']'
    },
    examples: [
        { code: '[10 20 30] unswons', expected: [10, [20, 30]] },
        { code: '[1] unswons', expected: [1, []] },
    ]
};