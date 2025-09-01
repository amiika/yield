import type { Operator } from '../../types';

export const trueOp: Operator = {
    definition: {
        exec: function*(s) { s.push(true); },
        description: 'Pushes the boolean value `true`.',
        effect: '-> B'
    },
    examples: [
        { code: 'true', expected: [true] }
    ]
};