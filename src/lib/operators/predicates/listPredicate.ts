import type { Operator } from '../../types';

export const listPredicate: Operator = {
    definition: {
        exec: function*(s) { s.push(Array.isArray(s.pop())); },
        description: 'Tests if the top element is a list.',
        effect: '[A] -> [bool]'
    },
    // FIX: Renamed `testCases` to `examples` to match the Operator type.
    examples: [
        { code: '[1 2] list?', expected: [true] },
        { code: '[] list?', expected: [true] },
        { code: '1 list?', expected: [false] },
    ]
};