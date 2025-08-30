import type { Operator } from '../../types';

export const rollup: Operator = {
    definition: {
        exec: function*(s) { const z = s.pop(), y = s.pop(), x = s.pop(); s.push(z, x, y); },
        description: 'Rolls the top three stack items up.',
        example: '1 2 3 rollup',
        effect: '[X Y Z] -> [Z X Y]'
    },
    testCases: [
        { code: '10 20 30 rollup', expected: [30, 10, 20] }
    ]
};