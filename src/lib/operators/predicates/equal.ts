import type { Operator } from '../../types';
import { deepEqual } from '../../utils';

export const equal: Operator = {
    definition: {
        exec: function*(s) { const b = s.pop(), a = s.pop(); s.push(deepEqual(a, b)); },
        description: 'Tests for deep equality.',
        effect: '[A B] -> [bool]'
    },
    examples: [
        { code: '10 10 ==', expected: [true] },
        { code: '10 5 ==', expected: [false] },
        { code: '"a" "a" ==', expected: [true] },
        { code: '(1 (2)) (1 (2)) ==', expected: [true] },
        { code: '(1 (2)) (1 (3)) ==', expected: [false] },
    ]
};