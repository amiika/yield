
import type { Operator } from '../../types';

export const hypot: Operator = {
    definition: {
        exec: function*(s) {
            const y = s.pop() as number;
            const x = s.pop() as number;
            if (typeof x !== 'number' || typeof y !== 'number') {
                throw new Error('hypot expects two numbers: x and y.');
            }
            s.push(Math.hypot(x, y));
        },
        description: 'Calculates the square root of the sum of the squares of its arguments (the hypotenuse).',
        effect: '[x y] -> [result]'
    },
    examples: [
        { code: '3 4 hypot', expected: [5] },
        { code: '5 12 hypot', expected: [13] },
    ]
};
