import type { Operator } from '../../types';

export const integerPredicate: Operator = {
    definition: {
        exec: function*(s) { s.push(Number.isInteger(s.pop())); },
        description: 'Tests if the top element is an integer.',
        effect: '[A] -> [bool]'
    },
    examples: [
        { code: '10 integer?', expected: [true] },
        { code: '-5 integer?', expected: [true] },
        { code: '10.5 integer?', expected: [false] },
        { code: '"10" integer?', expected: [false] },
    ]
};