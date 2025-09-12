import type { Operator } from '../../types';

export const tuck: Operator = {
    definition: {
        exec: function*(s) {
            if (s.length < 2) throw new Error('Stack underflow for operator: tuck');
            const y = s.pop();
            const x = s.pop();
            s.push(y, x, y);
        },
        description: 'Copies the top element and inserts it below the second element.',
        effect: '[X Y] -> [Y X Y]'
    },
    examples: [
        { code: '10 20 tuck', expected: [20, 10, 20] },
        { code: '1 2 3 tuck', expected: [1, 3, 2, 3] },
        { code: '1 tuck', expectedError: 'Stack underflow' },
    ]
};
