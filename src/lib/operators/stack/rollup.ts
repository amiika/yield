import type { Operator } from '../../types';

export const rollup: Operator = {
    definition: {
        exec: function*(s) { const z = s.pop(), y = s.pop(), x = s.pop(); s.push(z, x, y); },
        description: 'Rolls the top three stack items up.',
        effect: '[X Y Z] -> [Z X Y]'
    },
    examples: [
        { code: '1 2 3 rollup', expected: [3, 1, 2] },
        { code: '10 20 30 rollup', expected: [30, 10, 20] }
    ]
};