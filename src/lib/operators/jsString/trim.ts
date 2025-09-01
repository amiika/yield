import type { Operator } from '../../types';

export const trim: Operator = {
    definition: {
        exec: function*(s) { s.push(String(s.pop()).trim()); },
        description: 'Removes whitespace from both ends of a string.',
        effect: '[S] -> [S\']'
    },
    examples: [
        { code: '"  hello  " trim', expected: ["hello"] },
        { code: '"  hello world  " trim', expected: ["hello world"] },
        { code: '" \n\t  " trim', expected: [""] }
    ]
};