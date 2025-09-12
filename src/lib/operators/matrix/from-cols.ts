import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const matcols: Operator = {
    definition: {
        exec: function*(s) {
            const n = s.pop() as number;
            if (!Number.isInteger(n) || n < 0) {
                throw new Error('matcols operator expects a non-negative integer for the column count.');
            }
            
            if (s.length < n) {
                s.push(n); // push back argument
                throw new Error(`Stack underflow for matcols. Expected ${n} columns on the stack.`);
            }

            if (n === 0) {
                s.push([]);
                return;
            }

            const cols = s.splice(s.length - n, n);
            
            // An item is a valid column if it's an array and either not considered a matrix,
            // or it's an empty list (which isMatrix incorrectly flags as a matrix).
            const areAllLists = cols.every(item => Array.isArray(item) && (!isMatrix(item) || item.length === 0));
            if (!areAllLists) {
                s.push(...cols, n); // restore stack
                throw new Error('matcols expects all column arguments to be lists.');
            }

            const firstColLength = cols[0].length;
            if (!cols.every(col => col.length === firstColLength)) {
                s.push(...cols, n); // restore stack
                throw new Error('All lists must have the same length to form a matrix with matcols.');
            }
            
            if (firstColLength === 0) {
                 s.push([]);
                 return;
            }
            
            const rows = firstColLength;
            const matrix = Array.from({ length: rows }, () => Array(n).fill(0));

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < n; j++) {
                    matrix[i][j] = cols[j][i];
                }
            }

            s.push(matrix);
        },
        description: 'Creates a matrix from N column vectors. Consumes an integer N, then consumes N lists from the stack to use as the columns of the new matrix.',
        effect: '[col1 col2 ... colN N] -> [matrix]'
    },
    examples: [
        {
            code: '(1 3) (2 4) 2 matcols',
            expected: [[[1, 2], [3, 4]]]
        },
        {
            code: '(1 4 7) (2 5 8) (3 6 9) 3 matcols',
            expected: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]]
        },
         {
            code: '() () 2 matcols',
            expected: [[]]
        }
    ]
};