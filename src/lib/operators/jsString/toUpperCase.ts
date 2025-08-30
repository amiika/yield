import type { Operator } from '../../types';

export const ucase: Operator = {
    definition: {
        exec: function*(s) { s.push(String(s.pop()).toUpperCase()); },
        description: 'Converts a string to uppercase.',
        example: '"hello" ucase',
        effect: '[S] -> [S\']'
    },
    testCases: [
        { code: '"hello" ucase', expected: ["HELLO"] },
        { code: '"Hello World" ucase', expected: ["HELLO WORLD"] },
        { code: '"" ucase', expected: [""] }
    ]
};