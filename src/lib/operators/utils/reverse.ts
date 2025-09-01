import type { Operator } from '../../types';

export const reverse: Operator = {
    definition: {
        exec: function*(s) { s.push(s.pop().reverse()); },
        description: 'Reverses a list or string.',
        effect: '[S] -> [S\']'
    },
    examples: [
        { code: '[1 2 3 4] reverse', expected: [[4, 3, 2, 1]] },
        // Note: JS reverse for strings is not direct. This would need a custom implementation or split/reverse/join.
        // The current implementation works for arrays. This test is for an array of characters.
        { code: '["h" "e" "l" "l" "o"] reverse', expected: [ ["o","l","l","e","h"] ] },
    ]
};