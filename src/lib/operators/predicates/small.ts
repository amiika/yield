import type { Operator } from '../../types';

export const small: Operator = {
    definition: {
        exec: function*(s) { const a = s.pop(); s.push(a === 0 || a === 1 || (Array.isArray(a) && a.length <= 1)); },
        description: 'Tests if an aggregate has 0 or 1 members.',
        effect: '[A] -> [bool]'
    },
    examples: [
        { code: '(42) small', expected: [true] },
        { code: '1 small', expected: [true] },
        { code: '0 small', expected: [true] },
        { code: '() small', expected: [true] },
        { code: '(1 2) small', expected: [false] },
        { code: '2 small', expected: [false] },
    ]
};