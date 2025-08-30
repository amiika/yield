import type { Operator } from '../../types';

export const ends: Operator = {
    definition: {
        exec: function*(s) { 
            const suffix = s.pop() as string;
            const str = s.pop() as string;
            s.push(str.endsWith(suffix)); 
        },
        description: 'Checks if a string ends with the characters of a specified string. `S Suffix -> B`',
        example: '"hello" "lo" ends',
        effect: '[S Suffix] -> [bool]'
    },
    testCases: [
        { code: '"hello" "lo" ends', expected: [true] },
        { code: '"hello world" "world" ends', expected: [true] },
        { code: '"hello world" "hello" ends', expected: [false] }
    ]
};