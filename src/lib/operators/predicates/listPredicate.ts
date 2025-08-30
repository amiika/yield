import type { Operator } from '../../types';

export const listPredicate: Operator = {
    definition: {
        exec: function*(s) { s.push(Array.isArray(s.pop())); },
        description: 'Tests if the top element is a list.',
        example: '[1 2] list?',
        effect: '[A] -> [bool]'
    },
    testCases: [
        { code: '[1 2] list?', expected: [true] },
        { code: '[] list?', expected: [true] },
        { code: '1 list?', expected: [false] },
    ]
};