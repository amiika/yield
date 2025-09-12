import type { Operator } from '../../types';

export const clearall: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            for (const key in dictionary) {
                // User-defined words have a 'body' property, while built-ins have a 'definition' property.
                if ('body' in dictionary[key]) {
                    delete dictionary[key];
                }
            }
            s.length = 0; // Clear stack
        },
        description: 'Clears the stack and removes all user-defined words from the dictionary.',
        effect: '[...] -> []'
    },
    examples: [
        { code: '[1+] inc = 1 2 3 clearall stack', expected: [[]] },
        { code: '1 2 3 clearall', expected: [] },
    ]
};
