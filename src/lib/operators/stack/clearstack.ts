import type { Operator } from '../../types';

export const clearstack: Operator = {
    definition: {
        exec: function*(s) { s.length = 0; },
        description: 'Removes all items from the stack, leaving it empty.',
        example: '1 2 3 clearstack',
        effect: '[...] -> []'
    },
    testCases: [
        { code: '1 2 3 clearstack', expected: [] },
        { code: '[] clearstack', expected: [] },
    ]
};