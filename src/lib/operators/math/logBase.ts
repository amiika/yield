
import type { Operator } from '../../types';

export const logBase: Operator = {
    definition: {
        exec: function*(s) {
            const base = s.pop() as number;
            const value = s.pop() as number;
            if (typeof value !== 'number' || typeof base !== 'number') {
                throw new Error('logBase expects two numbers: value and base.');
            }
            s.push(Math.log(value) / Math.log(base));
        },
        description: 'Calculates the logarithm of a value with a given base.',
        effect: '[value base] -> [result]'
    },
    examples: [
        { code: '100 10 logBase', expected: [2] },
        { code: '256 2 logBase', expected: [8] },
    ]
};
