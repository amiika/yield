import type { Operator } from '../../types';

export const pop: Operator = {
    definition: {
        exec: function*(s) { s.pop(); },
        description: 'Removes the top element from the stack.',
        effect: '[X] -> []'
    },
    examples: [
        { code: '1 2 3 pop', expected: [1, 2] },
        { code: '() 1 pop', expected: [[]] },
    ]
};