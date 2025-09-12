import type { Operator } from '../../types';

export const average: Operator = {
    definition: {
        exec: function*(s) {
            const agg = s.pop() ?? [];
            if (!Array.isArray(agg)) {
                throw new Error('average expects a list');
            }
            const numbers = agg.filter(item => typeof item === 'number');
            if (numbers.length === 0) {
                s.push(0);
                return;
            }
            const sum = numbers.reduce((a, b) => a + b, 0);
            s.push(sum / numbers.length);
        },
        description: 'Calculates the average of the numbers in a list. Non-numeric elements are ignored.',
        effect: '[A] -> [N]'
    },
    examples: [
        { code: '(1 2 3 5) average', expected: [2.75] },
        { code: '(10 20 30) average', expected: [20] },
        { code: '(10 -10 30) average', expected: [10] },
        { code: '() average', expected: [0] },
        { code: '(1 2 "hello" 3) average', expected: [2] },
        { code: '("a" "b") average', expected: [0] },
        { code: 'average', expected: [0] },
        { code: '(1 2 3 5) avg', expected: [2.75] },
    ]
};
