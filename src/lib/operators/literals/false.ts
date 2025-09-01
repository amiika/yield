import type { Operator } from '../../types';

export const falseOp: Operator = {
    definition: {
        exec: function*(s) { s.push(false); },
        description: 'Pushes the boolean value `false`.',
        effect: '-> B'
    },
    examples: [
        { code: 'false', expected: [false] }
    ]
};