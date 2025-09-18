import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const crosspartition: Operator = {
    definition: {
        exec: function*(s) {
            const dims = s.pop();
            const row = s.pop();

            if (!Array.isArray(row) || isMatrix(row)) {
                throw new Error('crosspartition expects a tone row (list).');
            }
            if (!Array.isArray(dims) || dims.length !== 2 || typeof dims[0] !== 'number' || typeof dims[1] !== 'number') {
                throw new Error('crosspartition expects a dimension list [rows, cols].');
            }
            
            const [numRows, numCols] = dims;

            if (numRows * numCols !== row.length) {
                throw new Error(`The product of dimensions (${numRows}x${numCols}=${numRows*numCols}) must equal the length of the tone row (${row.length}).`);
            }
            
            if (numRows === 0 || numCols === 0) {
                s.push([]); // Result is an empty matrix
                return;
            }

            const matrix = Array.from({ length: numRows }, () => Array(numCols).fill(0));
            let k = 0;
            for (let j = 0; j < numCols; j++) { // Iterate through columns
                for (let i = 0; i < numRows; i++) { // Iterate through rows
                    matrix[i][j] = row[k++];
                }
            }
            s.push(matrix);
        },
        description: 'Arranges a tone row into a matrix (a cross-partition) of given dimensions. The row is read into the matrix column by column. This is useful for generating new harmonic and melodic material.',
        effect: '[L_row [N_rows N_cols]] -> [M_matrix]'
    },
    examples: [
        {
            code: '(0 1 2 3 4 5 6 7 8 9 10 11) (6 2) crosspartition',
            expected: [[[0, 6], [1, 7], [2, 8], [3, 9], [4, 10], [5, 11]]]
        },
        {
            code: `
# The example from Schoenberg's Op. 33a
(0 11 7 4 2 9 3 8 10 1 5 6)
(3 4) crosspartition`,
            expected: [[[0, 4, 3, 1], [11, 2, 8, 5], [7, 9, 10, 6]]]
        },
        {
            code: '(0 1 2 3) (3 2) crosspartition',
            expectedError: "product of dimensions (3x2=6) must equal the length of the tone row (4)"
        },
    ]
};
