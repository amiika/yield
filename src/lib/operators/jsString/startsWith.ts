import type { Operator } from '../../types';

export const starts: Operator = {
    definition: {
        exec: function*(s) { 
            const prefix = s.pop() as string;
            const str = s.pop() as string;
            s.push(str.startsWith(prefix)); 
        },
        description: 'Checks if a string starts with the characters of a specified string. `S Prefix -> B`',
        example: '"hello" "he" starts',
        effect: '[S Prefix] -> [bool]'
    },
    testCases: [
        { code: '"hello" "he" starts', expected: [true] },
        { code: '"hello world" "hello" starts', expected: [true] },
        { code: '"hello world" "world" starts', expected: [false] }
    ]
};