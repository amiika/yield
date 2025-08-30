import type { Operator } from '../../types';
import { deepEqual } from '../../utils';

export const equal: Operator = {
    definition: {
        exec: function*(s) { const b = s.pop(); const a = s.pop(); s.push(deepEqual(a, b)); },
        description: 'Recursively tests whether two values (including lists) are identical.',
        example: '[1 [2 3]] [1 [2 3]] equal',
        effect: '[A B] -> [bool]'
    },
    testCases: [
        { code: '[1 [2 3]] [1 [2 3]] equal', expected: [true] },
        { code: '[1 [2 3]] [1 [2 4]] equal', expected: [false] },
        { code: '1 1 equal', expected: [true] },
        { code: '{} {} equal', expected: [true] },
    ]
};