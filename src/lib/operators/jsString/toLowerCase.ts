import type { Operator } from '../../types';

export const locase: Operator = {
    definition: {
        exec: function*(s) { s.push(String(s.pop()).toLowerCase()); },
        description: 'Converts a string to lowercase.',
        example: '"HELLO" locase',
        effect: '[S] -> [S\']'
    },
    testCases: [
        { code: '"HELLO" locase', expected: ["hello"] },
        { code: '"Hello World" locase', expected: ["hello world"] },
        { code: '"" locase', expected: [""] }
    ]
};