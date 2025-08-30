import type { Operator } from '../../types';

export const rest: Operator = {
    definition: {
        exec: function*(s) { s.push(s.pop().slice(1)); },
        description: 'Gets the rest of a list (all but the first element).',
        example: '[10 20 30] rest',
        effect: '[A] -> [R]'
    },
    testCases: [
        { code: '[10 20 30] rest', expected: [[20, 30]] },
        { code: '[10] rest', expected: [[]] },
    ]
};