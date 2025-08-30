import type { Operator } from '../../types';

export const trueOp: Operator = {
    definition: {
        exec: function*(s) { s.push(true); },
        description: 'Pushes the boolean value `true`.',
        example: 'true',
        effect: '-> B'
    },
    testCases: [
        { code: 'true', expected: [true] }
    ]
};