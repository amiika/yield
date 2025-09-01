import type { Operator } from '../../types';

export const rolldown: Operator = {
    definition: {
        exec: function*(s) { const z = s.pop(), y = s.pop(), x = s.pop(); s.push(y, z, x); },
        description: 'Rolls the top three stack items down.',
        effect: '[X Y Z] -> [Y Z X]'
    },
    examples: [
        { code: '1 2 3 rolldown', expected: [2, 3, 1] },
        { code: '"c" "b" "a" rolldown', expected: ['b', 'a', 'c'] },
    ]
};