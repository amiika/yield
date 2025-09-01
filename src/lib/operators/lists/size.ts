import type { Operator } from '../../types';

export const size: Operator = {
    definition: {
        exec: function*(s) {
            const agg = s.pop();
            if (agg instanceof Set) {
                s.push(agg.size);
            } else {
                s.push(agg.length);
            }
        },
        description: 'Gets the number of elements in an aggregate (list, string, or set).',
        effect: '[A] -> [I]'
    },
    examples: [
        { code: '[1 2 3] size', expected: [3] },
        { code: '"hello" size', expected: [5] },
        { code: '{10 20 30} size', expected: [3] },
        { code: '[1 2 3] size "hello" size', expected: [3, 5]},
        { code: '[] size', expected: [0] },
    ]
};