import type { Operator } from '../../types';

export const regtest: Operator = {
    definition: {
        exec: function*(s) { 
            const pattern = s.pop() as string;
            const str = s.pop() as string;
            try {
                s.push(new RegExp(pattern).test(str));
            } catch (e) {
                throw new Error(`Invalid RegExp pattern: ${pattern}`);
            }
        },
        // FIX: Added missing properties to satisfy OperatorDefinition type.
        description: 'Tests if a string matches a regular expression. `S Pattern -> B`',
        effect: '[S Pattern] -> [bool]'
    },
    examples: [
        { code: '"hello" "^he" regtest', expected: [true] },
        { code: '"hello" "o$" regtest', expected: [true] },
        { code: '"banana" "na" regtest', expected: [true] },
        { code: '"banana" "^na" regtest', expected: [false] }
    ]
};