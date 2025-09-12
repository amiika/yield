import type { Operator } from '../../types';

export const size: Operator = {
    definition: {
        exec: function*(s) {
            const agg = s.pop();
            if (typeof agg === 'string' || Array.isArray(agg)) {
                s.push(agg.length);
            } else {
                throw new Error('size expects a list or a string.');
            }
        },
        description: 'Gets the number of elements in an aggregate (list or string).',
        effect: '[A] -> [I]'
    },
    examples: [
        { code: '(1 2 3) size', expected: [3] },
        { code: '"hello" size', expected: [5] },
        { code: '(10 20 30) set size', expected: [3] },
        { code: '(1 2 3) size "hello" size', expected: [3, 5]},
        { code: '() size', expected: [0] },
        { code: '123 size', expectedError: 'size expects a list or a string.'}
    ]
};
