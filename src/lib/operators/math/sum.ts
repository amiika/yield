import type { Operator } from '../../types';

export const sum: Operator = {
    definition: {
        exec: function*(s) { const arr = s.pop() ?? []; if (!Array.isArray(arr)) throw new Error('sum expects a list'); s.push(arr.reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0)); },
        description: 'Calculates the sum of a list of numbers.',
        example: '[1 2 3] sum',
        effect: '[[N1 N2]] -> [N]'
    },
    testCases: [
        { code: '[1 2 3] sum', expected: [6] },
        { code: '[10 -2 5] sum', expected: [13] },
        { code: '[] sum', expected: [0] },
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
                '[42] sum =', // Overwrite the built-in operator sum
                'sum'
            ],
            expected: [42]
        }
    ]
};