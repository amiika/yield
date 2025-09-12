import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

const is3DVector = (v: any): v is [number, number, number] => 
    Array.isArray(v) && 
    !isMatrix(v) && 
    v.length === 3 && 
    v.every(el => typeof el === 'number');

export const cross: Operator = {
    definition: {
        exec: function*(s) {
            const b = s.pop();
            const a = s.pop();

            if (!is3DVector(a) || !is3DVector(b)) {
                throw new Error('cross product requires two 3D vectors (lists of 3 numbers).');
            }
            
            const result = [
                a[1] * b[2] - a[2] * b[1],
                a[2] * b[0] - a[0] * b[2],
                a[0] * b[1] - a[1] * b[0]
            ];
            
            s.push(result);
        },
        description: 'Calculates the cross product of two 3D vectors.',
        effect: '[V1 V2] -> [V3]'
    },
    examples: [
        { code: '(1 0 0) (0 1 0) cross', expected: [[0, 0, 1]] }, // i x j = k
        { code: '(0 1 0) (1 0 0) cross', expected: [[0, 0, -1]] }, // j x i = -k
        { code: '(1 2 3) (4 5 6) cross', expected: [[-3, 6, -3]] },
        { code: '(1 2) (3 4 5) cross', expectedError: 'requires two 3D vectors' },
    ]
};
