import type { Operator } from '../../types';

export const asin: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.asin(s.pop())); },
        description: 'Arcsine.',
        example: '0.5 asin',
        effect: '[F] -> [G]'
    },
    testCases: [
        { code: '0.5 asin', expected: [0.5235987755982989] },
        { code: '0 asin', expected: [0] },
    ]
};