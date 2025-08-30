import type { Operator } from '../../types';

export const unitlist: Operator = {
    definition: {
        exec: function*(s) { s.push([s.pop()]); },
        description: 'Wraps the top element in a new list.',
        example: '10 unitlist',
        effect: '[X] -> [[X]]'
    },
    testCases: [
        { code: '10 unitlist', expected: [[10]] },
        { code: '[1] unitlist', expected: [[[1]]] },
    ]
};