import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const cmat: Operator = {
    definition: {
        exec: function*(s) {
            const m = s.pop() as number;

            if (!Number.isInteger(m) || m < 0) {
                throw new Error('cmat operator expects a non-negative integer.');
            }

            const top = s[s.length - 1];

            if (Array.isArray(top) && !isMatrix(top)) {
                // List mode: M is number of rows
                const list = s.pop() as any[];
                const n = m; // M is number of ROWS.
                
                if (n === 0) {
                    s.push([]);
                    return;
                }

                const cleanList = list.filter(el => typeof el === 'number');

                if (cleanList.length % n !== 0) {
                    throw new Error(`The number of number elements in the list (${cleanList.length}) is not divisible by the row count (${n}).`);
                }

                const cols = cleanList.length / n;
                const matrix: number[][] = Array.from({ length: n }, () => []);
                for (let i = 0; i < cleanList.length; i++) {
                    matrix[i % n].push(cleanList[i]);
                }
                s.push(matrix);

            } else {
                // Stack mode: M is number of columns (for a square matrix)
                const n = m; // Assume square matrix, so rows = columns
                const numElements = m * n;
                
                const numbersToTake: number[] = [];
                let itemsToScan = 0;
                
                // Scan the stack from the top to find numbers, skipping matrices.
                for (let i = s.length - 1; i >= 0 && numbersToTake.length < numElements; i--) {
                    const val = s[i];
                    itemsToScan++;
                    if (isMatrix(val)) {
                        continue;
                    }
                    if (typeof val !== 'number') {
                        throw new Error('cmat operator requires number elements from the stack.');
                    }
                    numbersToTake.push(val);
                }

                // Now, mutate the stack by removing the scanned items.
                s.splice(s.length - itemsToScan);

                // `numbersToTake` is in reverse stack order, so reverse it back.
                const elements = numbersToTake.reverse();
                
                // Pad with zeros if we didn't find enough numbers.
                while (elements.length < numElements) {
                    elements.push(0);
                }
                
                const matrix: number[][] = Array.from({ length: n }, () => []);
                for (let i = 0; i < elements.length; i++) {
                   matrix[i % n].push(elements[i]);
                }
                s.push(matrix);
            }
        },
        description: 'Creates a matrix in column-major order. If the next item is a list, it consumes a row count `M` and converts the list. Otherwise, it assumes a square `M`x`M` matrix and consumes `M*M` numbers from the stack. It ignores any non-numeric or matrix values it encounters.',
        effect: '[e1...e(M*M) M] -> [matrix] OR [[e1...eN] M] -> [matrix]'
    },
    examples: [
        { code: '1 2 3 4 2 cmat', expected: [[[1, 3], [2, 4]]] },
        { code: '(1 2 3 4 5 6) 3 cmat', expected: [[[1, 4], [2, 5], [3, 6]]] },
        { code: '(1 2 3 4) 2 cmat', expected: [[[1, 3], [2, 4]]] },
        { code: '1 2 3 4 5 6 7 8 9 3 cmat', expected: [[[1,4,7],[2,5,8],[3,6,9]]]},
        { code: '1 2 3 4 2 cmat 1 2 3 4 2 cmat', expected: [[[1,3],[2,4]], [[1,3],[2,4]]]},
        { code: '1 2 2 cmat', expected: [[[1, 0], [2, 0]]]},
        { code: '2 cmat', expected: [[[0, 0], [0, 0]]]}
    ]
};