import type { Operator } from '../../types';

export const not: Operator = {
    definition: {
        exec: function*(s) { s.push(!s.pop()); },
        description: 'Logical NOT. Replaces top of stack with its logical negation.',
        effect: '[A] -> [!A]'
    },
    examples: [
        { code: 'true not', expected: [false] },
        { code: 'false not', expected: [true] },
        { code: '0 not', expected: [true] },
    ]
};