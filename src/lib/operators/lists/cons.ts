import type { Operator } from '../../types';

export const cons: Operator = {
    definition: {
        exec: function*(s) { const l = s.pop(); const e = s.pop(); if (!Array.isArray(l)) throw new Error('cons expects a list'); s.push([e, ...l]); },
        description: 'Constructs a new list by prepending an element to a list. Expects element, then list on the stack.',
        effect: '[E L] -> [L\']'
    },
    examples: [
        { code: '1 (2 3 4) cons', expected: [[1, 2, 3, 4]] },
        { code: '() (1) cons', expected: [[[], 1]] },
    ]
};