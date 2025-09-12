import type { Operator } from '../../types';

export const regsub: Operator = {
    definition: {
        exec: function*(s) { 
            const replacement = s.pop() as string;
            const pattern = s.pop() as string;
            const str = s.pop() as string;
            try {
                s.push(str.replace(new RegExp(pattern), replacement));
            } catch (e) {
                throw new Error(`Invalid RegExp pattern: ${pattern}`);
            }
        },
        description: 'Replaces the first occurrence of a regex pattern in a string. `S Pattern Replacement -> S`',
        effect: '[S Pattern Replace] -> [S\']'
    },
    examples: [
        { code: '"banana" "a" "o" regsub', expected: ["bonana"] },
        { code: '"banana" "an" "o" regsub', expected: ["boana"] },
        { code: '"hello world" "l" "X" regsub', expected: ["heXlo world"] }
    ]
};
