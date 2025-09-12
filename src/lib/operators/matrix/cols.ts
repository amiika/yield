import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const cols: Operator = {
    definition: {
        exec: function*(s) {
            const matrix = s.pop();
            if (!isMatrix(matrix)) {
                throw new Error('cols operator expects a matrix.');
            }

            if (matrix.length === 0 || matrix[0].length === 0) {
                // If the matrix is empty, there are no columns to push.
                // If it has rows but no columns, push empty lists for each row.
                for (let i = 0; i < matrix.length; i++) {
                    s.push([]);
                }
                return;
            }

            const rows = matrix.length;
            const cols = matrix[0].length;

            const transposed = Array.from({ length: cols }, () => Array(rows).fill(0));

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    transposed[j][i] = matrix[i][j];
                }
            }
            s.push(...transposed);
        },
        description: 'Spreads the columns of a matrix onto the stack as individual lists.',
        effect: '[matrix] -> [col1 col2 ...]'
    },
    examples: [
        {
            code: '((1 2)(3 4)) cols',
            expected: [[1, 3], [2, 4]]
        },
        {
            code: '3 identity cols',
            expected: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
        },
         {
            code: '(1 2 3 4 5 6) 3 mat cols',
            expected: [[1, 4], [2, 5], [3, 6]]
        }
    ]
};