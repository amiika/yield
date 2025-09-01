import type { Operator } from '../../types';

export const nullPredicate: Operator = {
    definition: {
        exec: function*(s) { const a = s.pop(); s.push(a === 0 || (Array.isArray(a) && a.length === 0)); },
        description: 'Tests if a number is 0 or a list is empty.',
        effect: '[A] -> [bool]'
    },
    examples: [
        { code: '[] null?', expected: [true] },
        { code: '0 null?', expected: [true] },
        { code: '[1] null?', expected: [false] },
        { code: '1 null?', expected: [false] },
    ]
};