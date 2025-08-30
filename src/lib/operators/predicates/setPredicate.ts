import type { Operator } from '../../types';

export const setPredicate: Operator = {
    definition: {
        exec: function*(s) { s.push(s.pop() instanceof Set); },
        description: 'Tests if the top element is a set.',
        example: '{1 2} set?',
        effect: '[A] -> [bool]'
    },
    testCases: [
        { code: '{1 2} set?', expected: [true] },
        { code: '[1 2] set?', expected: [false] },
        { code: '{} set?', expected: [true] },
    ]
};