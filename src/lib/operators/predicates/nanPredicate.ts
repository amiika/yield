
import type { Operator } from '../../types';

export const nanPredicate: Operator = {
    definition: {
        exec: function*(s) {
            const v = s.pop();
            s.push(Number.isNaN(v));
        },
        description: 'Tests if the top element is NaN (Not a Number).',
        effect: '[A] -> [bool]'
    },
    examples: [
        { code: '0 0 / nan?', expected: [true] },
        { code: '10 nan?', expected: [false] },
        { code: '"a" nan?', expected: [false] },
    ]
};
