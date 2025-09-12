import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

const isVector = (v: any): v is number[] => Array.isArray(v) && !isMatrix(v) && v.every(el => typeof el === 'number');

export const dot: Operator = {
    definition: {
        exec: function*(s) {
            const b = s.pop();
            const a = s.pop();

            if (!isVector(a) || !isVector(b)) {
                throw new Error('dot product requires two vectors (lists of numbers).');
            }

            if (a.length !== b.length) {
                throw new Error('dot product requires vectors of the same length.');
            }
            
            if (a.length === 0) {
                s.push(0);
                return;
            }

            let sum = 0;
            for (let i = 0; i < a.length; i++) {
                sum += a[i] * b[i];
            }
            s.push(sum);
        },
        description: 'Calculates the dot product of two vectors (lists of numbers).',
        effect: '[V1 V2] -> [N]'
    },
    examples: [
        { code: '(1 2 3) (4 5 6) dot', expected: [32] },
        { code: '(10 20) (5 2) dot', expected: [90] },
        { code: '(1 2) (3 4 5) dot', expectedError: 'vectors of the same length' },
        { code: '1 (1 2) dot', expectedError: 'requires two vectors' },
    ]
};
