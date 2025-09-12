import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const rotcol: Operator = {
    definition: {
        exec: function*(s) {
            const matrix = s.pop();
            if (!isMatrix(matrix)) {
                throw new Error('rotcol expects a matrix on the stack.');
            }

            if (matrix.length < 2) {
                s.push(matrix);
                return;
            }

            // Create a new matrix to avoid mutation
            const rotated = [...matrix.slice(1), matrix[0]];
            s.push(rotated);
        },
        description: `Rotates the columns of a matrix up, moving the top row to the bottom.`,
        effect: `[matrix] -> [rotated_matrix]`
    },
    examples: [
        {
            code: `(1 2 3 4 5 6) 3 mat rotcol`,
            expected: [[[4, 5, 6], [1, 2, 3]]]
        },
        {
            code: `1 2 2 mat rotcol`,
            expected: [[[0, 0], [1, 2]]]
        }
    ]
};
