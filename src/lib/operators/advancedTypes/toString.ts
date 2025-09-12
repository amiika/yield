import type { Operator } from '../../types';
import { yieldFormatter } from '../../utils';

export const stringOp: Operator = {
    definition: {
        exec: function*(s) { 
            const value = s.pop();
            if (typeof value === 'string') {
                s.push(value);
            } else {
                // Use a modified formatter that doesn't add quotes to strings
                s.push(String(yieldFormatter(value)).replace(/^"(.*)"$/, '$1').replace(/^\((.*)\)$/, '$1'));
            }
        },
        description: 'Converts the top value on the stack to its string representation.',
        effect: '[A] -> [S]'
    },
    examples: [
        { code: '123 string', expected: ["123"] },
        { code: 'true string', expected: ["true"] },
        { code: '(1 2 3) string', expected: ["1 2 3"] },
        { code: '(1 2 2) set string', expected: ["1 2"] },
        { code: '"abc" string', expected: ["abc"] },
    ]
};