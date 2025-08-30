import type { Operator } from '../../types';

export const chr: Operator = {
    definition: {
        exec: function*(s) { s.push(String.fromCharCode(s.pop())); },
        description: 'Pushes the string representation of a character code.',
        example: '65 chr',
        effect: '[I] -> [S]'
    },
    testCases: [
        { code: '65 chr', expected: ["A"] },
        { code: '97 chr', expected: ["a"] },
    ]
};