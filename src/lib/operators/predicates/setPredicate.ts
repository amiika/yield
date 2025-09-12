import type { Operator } from '../../types';

export const setPredicate: Operator = {
    definition: {
        exec: function*(s) {
            const v = s.pop();
            // set? should only work on lists
            if (!Array.isArray(v)) {
                s.push(false);
                return;
            }
            // Check for uniqueness
            s.push(new Set(v).size === v.length);
        },
        description: 'Tests if the top element is a list with only unique values.',
        effect: '[A] -> [bool]'
    },
    examples: [
        { code: '(1 2 3) set?', expected: [true] },
        { code: '(1 2 2 3) set?', expected: [false] },
        { code: '() set?', expected: [true] },
        { code: '"hello" set?', expected: [false] }, // Not a list
        { code: '(1 2 3) set set?', expected: [true] }, // set operator creates a unique list
    ]
};