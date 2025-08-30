import type { Operator } from '../../types';

export const cons: Operator = {
    definition: {
        exec: function*(s) { const l = s.pop(); const e = s.pop(); if (!Array.isArray(l)) throw new Error('cons expects a list'); s.push([e, ...l]); },
        description: 'Constructs a new list by pushing an element onto the front of an existing list.',
        example: '1 [2 3 4] cons',
        effect: '[A X] -> [B]'
    },
    testCases: [
        { code: '1 [2 3 4] cons', expected: [[1, 2, 3, 4]] },
        { code: '[] [1] cons', expected: [[[], 1]] },
    ]
};