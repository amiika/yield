import type { Operator } from '../../types';

export const swons: Operator = {
    definition: {
        exec: function*(s) { const e = s.pop(); const l = s.pop(); if (!Array.isArray(l)) throw new Error('swons expects a list'); s.push([e, ...l]); },
        description: 'The reverse of `cons`. Constructs a new list by pushing an element onto the front of an existing list. `A X -> B`',
        effect: '[L E] -> [L\']'
    },
    examples: [
        { code: '[2 3 4] 1 swons', expected: [[1, 2, 3, 4]] },
        { code: '[] 1 swons', expected: [[1]] },
    ]
};