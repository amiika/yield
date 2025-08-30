import type { Operator } from '../../types';

export const atan: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.atan(s.pop())); },
        description: 'Arctangent.',
        example: '1 atan',
        effect: '[F] -> [G]'
    },
    testCases: [
        { code: '1 atan', expected: [0.7853981633974483] },
        { code: '0 atan', expected: [0] },
    ]
};