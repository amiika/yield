import type { Operator } from '../../types';

export const clearall: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            for (const key in dictionary) {
                // Built-in operators have an 'exec' property. User-defined ones do not.
                if (!('exec' in dictionary[key])) {
                    delete dictionary[key];
                }
            }
            s.length = 0; // Clear stack
        },
        description: 'Clears the stack and removes all user-defined words from the dictionary.',
        example: '[1+] inc = 1 2 3 clearall stack',
        effect: '[...] -> []'
    },
    testCases: [
        { code: '[1+] inc = 1 2 3 clearall stack', expected: [[]] },
        { code: '1 2 3 clearall', expected: [] },
    ]
};