import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const rotmat: Operator = {
    definition: {
        exec: function*(s) {
            const matrix = s.pop();
            if (!isMatrix(matrix)) {
                throw new Error('rotmat expects a matrix on the stack.');
            }

            if (matrix.length === 0 || matrix[0].length === 0) {
                s.push(matrix);
                return;
            }

            const rows = matrix.length;
            const cols = matrix[0].length;
            
            // Transpose
            const transposed = Array.from({ length: cols }, () => Array(rows).fill(0));
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    transposed[j][i] = matrix[i][j];
                }
            }

            // Reverse each row of the transposed matrix
            const rotated = transposed.map(row => row.reverse());
            
            s.push(rotated);
        },
        description: `Rotates a matrix 90 degrees clockwise.`,
        effect: `[matrix] -> [rotated_matrix]`
    },
    examples: [
        {
            code: `1 2 3 4 2 mat rotmat`,
            expected: [[[3, 1], [4, 2]]]
        },
        {
            code: `(1 2 3 4 5 6) 3 mat rotmat`,
            expected: [[[4, 1], [5, 2], [6, 3]]]
        }
    ]
};
