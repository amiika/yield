import type { Operator } from '../../types';

export const put: Operator = {
    definition: {
        exec: function*(s) { s; },
        description: 'No-op. Sometimes used for clarity to indicate a value is intentionally left on the stack.',
        effect: '[A] -> [A]'
    },
    examples: [
        { code: '42 put', expected: [42] },
        { code: '1 2 3 put', expected: [1, 2, 3] }
    ]
};