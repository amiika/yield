import type { Operator } from '../../types';

export const size: Operator = {
    definition: {
        exec: function*(s) { s.push(s.pop().length); },
        description: 'Gets the number of elements in a list or string.',
        example: '[1 2 3] size "hello" size',
        effect: '[A] -> [I]'
    },
    testCases: [
        { code: '[1 2 3] size', expected: [3] },
        { code: '"hello" size', expected: [5] },
        { code: '[1 2 3] size "hello" size', expected: [3, 5]},
        { code: '[] size', expected: [0] },
    ]
};