import type { Operator } from '../../types';

export const leaf: Operator = {
    definition: {
        exec: function*(s) { const v = s.pop(); s.push(!Array.isArray(v)); },
        description: 'Tests whether a value is a leaf (i.e., not a list).',
        effect: '[A] -> [bool]'
    },
    examples: [
        { code: '42 leaf', expected: [true] },
        { code: '"hello" leaf', expected: [true] },
        { code: '[] leaf', expected: [false] },
        { code: '[1 2] leaf', expected: [false] },
    ]
};