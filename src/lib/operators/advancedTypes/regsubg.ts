import type { Operator } from '../../types';

export const regsubg: Operator = {
    definition: {
        exec: function*(s) { 
            const replacement = s.pop() as string;
            const pattern = s.pop() as string;
            const str = s.pop() as string;
            try {
                s.push(str.replace(new RegExp(pattern, 'g'), replacement));
            } catch (e) {
                throw new Error(`Invalid RegExp pattern: ${pattern}`);
            }
        },
        description: 'Replaces all occurrences of a regex pattern in a string (global substitute). `S Pattern Replacement -> S`',
        effect: '[S Pattern Replace] -> [S\']'
    },
    examples: [
        { code: '"banana" "a" "o" regsubg', expected: ["bonono"] },
        { code: '"banana" "an" "o" regsubg', expected: ["booa"] },
        { code: '"hello world" "l" "X" regsubg', expected: ["heXXo worXd"] }
    ]
};
