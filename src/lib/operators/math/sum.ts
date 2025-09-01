import type { Operator } from '../../types';

export const sum: Operator = {
    definition: {
        exec: function*(s) {
            const agg = s.pop() ?? [];
            let itemsToSum;

            if (Array.isArray(agg)) {
                itemsToSum = agg;
            } else if (agg instanceof Set) {
                itemsToSum = Array.from(agg);
            } else {
                throw new Error('sum expects a list or a set');
            }
            s.push(itemsToSum.reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0));
        },
        description: 'Calculates the sum of the numbers in a list or set.',
        effect: '[A] -> [N]'
    },
    examples: [
        { code: '[1 2 3] sum', expected: [6] },
        { code: '{10 20 30} sum', expected: [60] },
        { code: '[10 -2 5] sum', expected: [13] },
        { code: '[] sum', expected: [0] },
        { code: '{} sum', expected: [0] },
        { code: 'sum', expected: [0] },
        {
            code: [
                '"some_value" :sum =', // Define a symbol :sum
                '[1 2 3] sum'          // Use the built-in operator sum
            ],
            expected: [6]
        },
        {
            code: [
                '[1 +] sum =', // Overwrite the built-in operator sum
                '1 sum'
            ],
            expected: [2]
        }
    ]
};