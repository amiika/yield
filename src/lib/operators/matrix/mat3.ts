import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const mat3: Operator = {
    definition: {
        exec: function*(s) {
            const size = 3;

            // NEW: Check if the top 3 items are lists of size 3.
            if (s.length >= size) {
                const top_n_items = s.slice(s.length - size);
                const areAllValidRows = top_n_items.every(
                    item => Array.isArray(item) && !isMatrix(item) && item.length === size
                );

                if (areAllValidRows) {
                    const rows = s.splice(s.length - size, size);
                    s.push(rows);
                    return;
                }
            }
            
            // Fallback to original behavior
            const numElements = size * size;
            
            const availableElements = s.splice(Math.max(0, s.length - numElements));

            if (!availableElements.every(el => typeof el === 'number')) {
                 // Restore stack before throwing
                s.push(...availableElements);
                throw new Error(`mat3 operator requires number elements from the stack.`);
            }

            const numToPad = numElements - availableElements.length;
            const padding = Array(numToPad).fill(0);
            const elements = [...availableElements, ...padding];

            const matrix: number[][] = [];
            for (let i = 0; i < size; i++) {
                matrix.push(elements.slice(i * size, (i + 1) * size));
            }
            s.push(matrix);
        },
        description: `Creates a 3x3 matrix. If the top three stack items are lists of size 3, they are used as rows. Otherwise, it consumes up to 9 numbers from the stack. Fills with 0 if not enough elements are available.`,
        effect: `[[r1][r2][r3]] -> [matrix] OR [e1...e9]? -> [matrix]`
    },
    examples: [
        // List of lists mode
        { code: `(1 2 3) (4 5 6) (7 8 9) mat3`, expected: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]] },

        // Original examples
        { 
            code: `1 2 3 4 5 6 7 8 9 mat3`,
            expected: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]]
        },
        {
            code: `1 2 3 mat3`,
            expected: [[[1,2,3],[0,0,0],[0,0,0]]]
        },
        {
            code: `mat3`,
            expected: [[[0,0,0],[0,0,0],[0,0,0]]]
        }
    ]
};