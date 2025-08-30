import type { Operator } from '../../types';

export const regtest: Operator = {
    definition: {
        exec: function*(s) { 
            const pattern = s.pop() as string;
            const str = s.pop() as string;
            try {
                const regex = new RegExp(pattern);
                s.push(regex.test(str));
            } catch (e) {
                throw new Error(`Invalid RegExp pattern: ${pattern}`);
            }
        },
        description: 'Tests if a string matches a regular expression. `S Pattern -> B`',
        example: '"banana" "^b" regtest',
        effect: '[S Pattern] -> [bool]'
    },
    testCases: [
        { code: '"banana" "an" regtest', expected: [true] },
        { code: '"banana" "^b" regtest', expected: [true] },
        { code: '"banana" "a$" regtest', expected: [true] },
        { code: '"banana" "c" regtest', expected: [false] }
    ]
};