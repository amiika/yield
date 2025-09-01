import type { Operator } from '../../types';

export const abs: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.abs(s.pop() ?? 0)); },
        description: 'Pushes the absolute value of the top element.',
        effect: '[N] -> [N\']'
    },
    examples: [
        { code: '-15 abs', expected: [15] },
        { code: '20 abs', expected: [20] },
        { code: 'abs', expected: [0] }
    ]
};