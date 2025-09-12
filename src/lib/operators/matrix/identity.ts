import type { Operator } from '../../types';

export const identity: Operator = {
    definition: {
        exec: function*(s) {
            const n = s.pop() as number;
            if (!Number.isInteger(n) || n < 0) {
                throw new Error('identity operator expects a non-negative integer.');
            }

            const matrix: number[][] = [];
            for (let i = 0; i < n; i++) {
                const row = Array(n).fill(0);
                row[i] = 1;
                matrix.push(row);
            }
            s.push(matrix);
        },
        description: 'Creates an NxN identity matrix.',
        effect: '[N] -> [matrix]'
    },
    examples: [
        {
            code: '3 identity',
            expected: [[[1, 0, 0], [0, 1, 0], [0, 0, 1]]]
        },
        {
            code: '1 identity',
            expected: [[[1]]]
        },
        {
            code: '0 identity',
            expected: [[]]
        }
    ]
};