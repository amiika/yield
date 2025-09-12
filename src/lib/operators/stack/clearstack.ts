import type { Operator } from '../../types';

export const clear: Operator = {
    definition: {
        exec: function*(s) { s.length = 0; },
        description: 'Removes all items from the stack, leaving it empty.',
        effect: '[...] -> []'
    },
    examples: [
        { code: '1 2 3 clear', expected: [] },
        { code: '[] clear', expected: [] },
    ]
};