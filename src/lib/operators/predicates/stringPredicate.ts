import type { Operator } from '../../types';

export const stringPredicate: Operator = {
    definition: {
        exec: function*(s) { const v = s.pop(); s.push(typeof v === 'string'); },
        description: 'Tests if the top element is a string.',
        example: '"hi" string?',
        effect: '[A] -> [bool]'
    },
    testCases: [
        { code: '"hi" string?', expected: [true] },
        { code: '"" string?', expected: [true] },
        { code: '1 string?', expected: [false] },
    ]
};