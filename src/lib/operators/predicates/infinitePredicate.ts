
import type { Operator } from '../../types';

export const infinitePredicate: Operator = {
    definition: {
        exec: function*(s) {
            const v = s.pop();
            s.push(v === Infinity || v === -Infinity);
        },
        description: 'Tests if the top element is infinite.',
        effect: '[A] -> [bool]'
    },
    examples: [
        { code: '1 0 / infinite?', expected: [true] },
        { code: '10 infinite?', expected: [false] },
        { code: '"a" infinite?', expected: [false] },
    ]
};
