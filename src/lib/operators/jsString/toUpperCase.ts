import type { Operator } from '../../types';

export const ucase: Operator = {
    definition: {
        exec: function*(s) { s.push(String(s.pop()).toUpperCase()); },
        description: 'Converts a string to uppercase.',
        effect: '[S] -> [S\']'
    },
    examples: [
        { code: '"hello" ucase', expected: ["HELLO"] },
        { code: '"Hello World" ucase', expected: ["HELLO WORLD"] },
        { code: '"" ucase', expected: [""] }
    ]
};