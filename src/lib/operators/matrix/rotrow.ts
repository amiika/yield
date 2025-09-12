import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const rotrow: Operator = {
    definition: {
        exec: function*(s) {
            const matrix = s.pop();
            if (!isMatrix(matrix)) {
                throw new Error('rotrow expects a matrix on the stack.');
            }

            if (matrix.length === 0) {
                s.push(matrix);
                return;
            }

            const rotated = matrix.map(row => {
                if (row.length < 2) {
                    return [...row];
                }
                const newRow = [...row];
                const last = newRow.pop();
                newRow.unshift(last);
                return newRow;
            });
            
            s.push(rotated);
        },
        description: `Rotates each row of a matrix to the right, moving the last element of each row to the first position.`,
        effect: `[matrix] -> [rotated_matrix]`
    },
    examples: [
        {
            code: `(1 2 3 4 5 6) 3 mat rotrow`,
            expected: [[[3, 1, 2], [6, 4, 5]]]
        },
        {
            code: `1 2 3 4 2 mat rotrow`,
            expected: [[[2, 1], [4, 3]]]
        }
    ]
};
