import type { Operator } from '../../types';

export const sign: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.sign(s.pop() ?? 0)); },
        description: 'Pushes the sign of a number (-1, 0, or 1).',
        example: '-15 sign',
        effect: '[N] -> [N\']'
    },
    testCases: [
        { code: '-15 sign', expected: [-1] },
        { code: '15 sign', expected: [1] },
        { code: '0 sign', expected: [0] },
        { code: 'sign', expected: [0] }
    ]
};