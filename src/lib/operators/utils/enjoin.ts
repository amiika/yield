import type { Operator } from '../../types';

export const enjoin: Operator = {
    definition: {
        exec: function*(s) {
            if (s.length < 1) {
                s.push("");
                return;
            }
            const separator = String(s.pop());
            const result = s.join(separator);
            s.length = 0; // Clear the stack
            s.push(result);
        },
        description: 'Joins all elements on the stack (except the separator at the top) into a single string, separated by the given separator.',
        effect: '[A B C ... S] -> [S\']'
    },
    examples: [
        { code: '1 2 3 "-" enjoin', expected: ["1-2-3"] },
        { code: '"hello" "world" " " enjoin', expected: ["hello world"] },
        { code: '1 2 3 "" enjoin', expected: ["123"] },
        { code: '"," enjoin', expected: [""] },
        { code: 'enjoin', assert: s => s.length === 1 && s[0] === '', expectedDescription: 'Empty string for empty stack' },
    ]
};
