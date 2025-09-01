import type { Operator } from '../../types';

export const clearstack: Operator = {
    definition: {
        exec: function*(s) { s.length = 0; },
        description: 'Removes all items from the stack, leaving it empty.',
        effect: '[...] -> []'
    },
    // FIX: Renamed 'testCases' to 'examples' for consistency.
    examples: [
        { code: '1 2 3 clearstack', expected: [] },
        { code: '[] clearstack', expected: [] },
    ]
};