import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const transpose: Operator = {
    definition: {
        exec: function*(s) {
            const matrix = s.pop();
            if (!isMatrix(matrix)) {
                throw new Error('transpose expects a matrix on the stack.');
            }

            if (matrix.length === 0 || matrix[0].length === 0) {
                s.push(matrix);
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
            s.push(transposed);
        },
        description: `Transposes a matrix, swapping its rows and columns.`,
        effect: `[matrix] -> [transposed_matrix]`
    },
    examples: [
        {
            code: `1 2 3 4 2 mat transpose`,
            expected: [[[1, 3], [2, 4]]]
        },
        {
            code: `(1 2 3 4 5 6) 3 mat transpose`,
            expected: [[[1, 4], [2, 5], [3, 6]]]
        },
        {
            code: `() mat transpose`,
            expected: [[]]
        }
    ]
};
