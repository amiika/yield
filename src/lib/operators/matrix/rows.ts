import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const rows: Operator = {
    definition: {
        exec: function*(s) {
            const matrix = s.pop();
            if (!isMatrix(matrix)) {
                throw new Error('rows operator expects a matrix.');
            }

            s.push(...matrix);
        },
        description: 'Spreads the rows of a matrix onto the stack as individual lists.',
        effect: '[matrix] -> [row1 row2 ...]'
    },
    examples: [
        {
            code: '((1 2)(3 4)) rows',
            expected: [[1, 2], [3, 4]]
        },
        {
            code: '3 identity rows',
            expected: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
        }
    ]
};