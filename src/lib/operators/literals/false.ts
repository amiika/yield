import type { Operator } from '../../types';

export const falseOp: Operator = {
    definition: {
        exec: function*(s) { s.push(false); },
        description: 'Pushes the boolean value `false`.',
        example: 'false',
        effect: '-> B'
    },
    testCases: [
        { code: 'false', expected: [false] }
    ]
};