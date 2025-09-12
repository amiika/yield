import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const map: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const p = s.pop();
            const agg = s.pop();

            if (isMatrix(agg)) {
                const matrix = agg as any[][];
                const resultMatrix = [];

                for (const row of matrix) {
                    const newRow = [];
                    for (const item of row) {
                        const tempStack = [item];
                        yield* evaluate([...p], tempStack, options);
                        
                        // For matrix map, we preserve structure.
                        // We expect a one-to-one transformation. If the quotation
                        // leaves multiple items, we take the top one.
                        if (tempStack.length === 0) {
                            newRow.push(null);
                        } else {
                            newRow.push(tempStack[tempStack.length - 1]);
                        }
                    }
                    resultMatrix.push(newRow);
                }
                s.push(resultMatrix);

            } else if (Array.isArray(agg)) { // Existing list logic
                const results = [];
                for (const item of agg) {
                    const tempStack = [item];
                    yield* evaluate([...p], tempStack, options);
                    results.push(...tempStack);
                }
                s.push(results);
            } else {
                s.push(agg, p); // Push back if not applicable
                throw new Error('map expects a list or a matrix.');
            }
        },
        description: 'Applies a program to each element of an aggregate. For a list, it creates a new list by concatenating the results of each application. For a matrix, it creates a new matrix of the same dimensions where each element is the result of applying the program to the corresponding input element. If the program leaves multiple items on the stack for a matrix element, only the top item is used.',
        effect: '[L|M [P]] -> [L\'|M\']'
    },
    examples: [
        // List examples
        { code: '(1 2 3 4) (dup *) map', expected: [[1, 4, 9, 16]] },
        { code: '() (succ) map', expected: [[]] },
        { code: '(1 2) (dup dup) map', expected: [[1, 1, 1, 2, 2, 2]]},
        
        // Matrix examples
        { code: '((1 2)(3 4)) (succ) map', expected: [[[2, 3], [4, 5]]] },
        { code: '((1 2)(3 4)) (dup *) map', expected: [[[1, 4], [9, 16]]] },
        {
            code: '((1 2)(3 4)) (pop (5 6)) map',
            expected: [[[[5, 6], [5, 6]], [[5, 6], [5, 6]]]]
        },
        {
            code: '((1 2)(3 4)) (dup dup) map',
            expected: [[[1, 2], [3, 4]]]
        }
    ]
};