import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const mat: Operator = {
    definition: {
        exec: function*(s) {
            const m_val = s.pop();

            if (typeof m_val !== 'number' || !Number.isInteger(m_val) || m_val < 0) {
                // Gracefully handle `() mat` by producing an empty matrix
                if (Array.isArray(m_val) && m_val.length === 0) {
                    s.push([]);
                    return;
                }
                // For other invalid inputs, restore stack and throw
                if (m_val !== undefined) s.push(m_val);
                throw new Error('mat operator expects a non-negative integer for column count.');
            }
            const m = m_val as number;

            // NEW: Check if the top M items are lists to form a matrix.
            if (s.length >= m && m > 0) {
                const top_m_items = s.slice(s.length - m);
                const areAllLists = top_m_items.every(item => Array.isArray(item) && !isMatrix(item));

                if (areAllLists) {
                    const rows = s.splice(s.length - m, m);
                    
                    // Check for consistent column length
                    const firstRowLength = rows[0].length;
                    if (!rows.every(row => row.length === firstRowLength)) {
                        // Restore stack before throwing
                        s.push(...rows, m);
                        throw new Error('All lists must have the same length to form a matrix.');
                    }
                    
                    s.push(rows);
                    return;
                }
            }

            if (m === 0) {
                const top = s[s.length - 1];
                if (Array.isArray(top)) {
                    const list = s.pop() as any[];
                    const rows = list.length;
                    s.push(Array(rows).fill([]));
                } else {
                    s.push([]);
                }
                return;
            }

            const top = s[s.length - 1];

            if (Array.isArray(top) && !isMatrix(top)) {
                const list = s.pop() as any[];
                
                const cleanList = list.filter(el => typeof el === 'number');

                if (cleanList.length % m !== 0) {
                    throw new Error(`The number of number elements in the list (${cleanList.length}) is not divisible by the column count (${m}).`);
                }
                
                const matrix: number[][] = [];
                for (let i = 0; i < cleanList.length; i += m) {
                    matrix.push(cleanList.slice(i, i + m));
                }
                s.push(matrix);

            } else {
                const n = m; // Assume square matrix, so rows = columns
                const numElements = m * n;
                
                const numbersToTake: number[] = [];
                const itemsToPop: any[] = [];
                
                // Collect numbers and items to pop from a temporary copy.
                // This prevents stack mutation if an error is thrown.
                const tempStack = [...s];
                while(tempStack.length > 0 && numbersToTake.length < numElements) {
                    const val = tempStack.pop();
                    itemsToPop.push(val);
                    if (isMatrix(val)) {
                        continue;
                    }
                    if (typeof val !== 'number') {
                        throw new Error('mat operator requires number elements from the stack.');
                    }
                    numbersToTake.push(val);
                }

                // Now, mutate the actual stack.
                s.length -= itemsToPop.length;

                // `numbersToTake` is in reverse stack order, so reverse it back.
                const elements = numbersToTake.reverse();
                
                // Pad with zeros if we didn't find enough numbers.
                while (elements.length < numElements) {
                    elements.push(0);
                }
                
                const matrix: number[][] = [];
                for (let i = 0; i < n; i++) {
                    matrix.push(elements.slice(i * m, (i + 1) * m));
                }
                s.push(matrix);
            }
        },
        description: 'Creates a matrix. Consumes a number `M`. If the top `M` items on the stack are lists of consistent length, they form the rows of the matrix. Otherwise, if the next item is a list, it converts that list into a matrix with `M` columns. Otherwise, it assumes a square matrix, consuming `M*M` numbers to create an `M`x`M` matrix.',
        effect: '[r1..rM M] -> [matrix] OR [[e1...eN] M] -> [matrix] OR [e1..e(M*M) M] -> [matrix]'
    },
    examples: [
        // List of lists mode
        { code: '(1 2) (3 4) 2 mat', expected: [[[1, 2], [3, 4]]] },
        { code: '(1) (2) (3) 3 mat', expected: [[[1], [2], [3]]] },
        { code: '(1 2) (3 4 5) 2 mat', expectedError: 'All lists must have the same length to form a matrix.' },

        // Original examples
        { code: '1 2 3 4 2 mat', expected: [[[1, 2], [3, 4]]] },
        { code: '(1 2 3 4 5 6) 3 mat', expected: [[[1, 2, 3], [4, 5, 6]]] },
        { code: '(1 2 3 4 5) 2 mat', expectedError: 'The number of number elements in the list (5) is not divisible by the column count (2).' },
        { code: '1 2 3 4 5 6 7 8 9 3 mat', expected: [[[1,2,3],[4,5,6],[7,8,9]]]},
        { code: '1 2 3 2 mat', expected: [[[1, 2], [3, 0]]] },
        { code: '1 2 3 "a" 2 mat', expectedError: `mat operator requires number elements from the stack.`},
        { code: '1 2 3 4 2 mat 1 2 3 4 2 mat', expected: [[[1,2],[3,4]], [[1,2],[3,4]]]},
        { code: `(1 2 3 4 2 mat) mymatrix = (1 2 mymatrix 3 4) 2 mat`, expected: [[[1,2],[3,4]]]},
        { code: '2 mat', expected: [[[0, 0], [0, 0]]]}
    ]
};