import type { Operator } from '../../types';

export const swons: Operator = {
    definition: {
        exec: function*(s) { const e = s.pop(); const l = s.pop(); if (!Array.isArray(l)) throw new Error('swons expects a list'); s.push([e, ...l]); },
        description: 'Constructs a new list by prepending an element to a list. Expects list, then element on the stack. Equivalent to `swap cons`.',
        effect: '[L E] -> [L\']'
    },
    examples: [
        { code: '(2 3 4) 1 swons', expected: [[1, 2, 3, 4]] },
        { code: '() 1 swons', expected: [[1]] },
    ]
};