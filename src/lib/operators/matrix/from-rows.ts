import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const matrows: Operator = {
    definition: {
        exec: function*(s) {
            const n = s.pop() as number;
            if (!Number.isInteger(n) || n < 0) {
                throw new Error('matrows operator expects a non-negative integer for the row count.');
            }

            if (s.length < n) {
                s.push(n); // push back argument
                throw new Error(`Stack underflow for matrows. Expected ${n} rows on the stack.`);
            }
            
            if (n === 0) {
                s.push([]);
                return;
            }

            const rows = s.splice(s.length - n, n);
            
            // An item is a valid row if it's an array and either not considered a matrix,
            // or it's an empty list (which isMatrix incorrectly flags as a matrix).
            const areAllLists = rows.every(item => Array.isArray(item) && (!isMatrix(item) || item.length === 0));
            if (!areAllLists) {
                s.push(...rows, n); // restore stack
                throw new Error('matrows expects all row arguments to be lists.');
            }

            const firstRowLength = rows[0].length;
            if (!rows.every(row => row.length === firstRowLength)) {
                s.push(...rows, n); // restore stack
                throw new Error('All lists must have the same length to form a matrix with matrows.');
            }

            s.push(rows);
        },
        description: 'Creates a matrix from N row vectors. Consumes an integer N, then consumes N lists from the stack to use as the rows of the new matrix.',
        effect: '[row1 row2 ... rowN N] -> [matrix]'
    },
    examples: [
        {
            code: '(1 2) (3 4) 2 matrows',
            expected: [[[1, 2], [3, 4]]]
        },
        {
            code: '(1) (2) (3) 3 matrows',
            expected: [[[1], [2], [3]]]
        },
        {
            code: '0 matrows',
            expected: [[]]
        }
    ]
};