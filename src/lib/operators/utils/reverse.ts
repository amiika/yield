import type { Operator } from '../../types';

export const reverse: Operator = {
    definition: {
        exec: function*(s) { 
            const val = s.pop();
            if (Array.isArray(val)) {
                // In-place reverse for arrays
                s.push(val.reverse());
            } else if (typeof val === 'string') {
                // Strings are immutable, so create a new reversed string
                s.push(val.split('').reverse().join(''));
            } else {
                throw new Error('reverse expects a list or a string.');
            }
        },
        description: 'Reverses a list or string.',
        effect: '[S] -> [S\']'
    },
    examples: [
        { code: '(1 2 3 4) reverse', expected: [[4, 3, 2, 1]] },
        // Note: JS reverse for strings is not direct. This would need a custom implementation or split/reverse/join.
        // The current implementation works for arrays. This test is for an array of characters.
        { code: '("h" "e" "l" "l" "o") reverse', expected: [ ["o","l","l","e","h"] ] },
        { code: '"hello" reverse', expected: ["olleh"] },
    ]
};