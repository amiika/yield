import type { Operator } from '../../types';

export const unstack: Operator = {
    definition: {
        exec: function*(s) { 
            const list = s.pop();
            if (!Array.isArray(list)) throw new Error('unstack expects a list.');
            s.length = 0; 
            // The first element of the list becomes the top of the stack,
            // so we must reverse it before pushing.
            s.push(...[...list].reverse());
        },
        description: 'The list becomes the new stack. The first element of the list is the top of the new stack.',
        example: '1 2 [10 20 30] unstack',
        effect: '[... [L]] -> [..]'
    },
    testCases: [
        { code: '1 2 [10 20 30] unstack', expected: [30, 20, 10] }
    ]
};