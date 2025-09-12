import type { Operator } from '../../types';

export const over: Operator = {
    definition: {
        exec: function*(s) {
            if (s.length < 2) throw new Error('Stack underflow for operator: over');
            s.push(s[s.length - 2]);
        },
        description: 'Copies the second element from the top of the stack to the top.',
        effect: '[X Y] -> [X Y X]'
    },
    examples: [
        { code: '10 20 over', expected: [10, 20, 10] },
        { code: '1 2 3 over', expected: [1, 2, 3, 2] },
        { code: '1 over', expectedError: 'Stack underflow' },
    ]
};
