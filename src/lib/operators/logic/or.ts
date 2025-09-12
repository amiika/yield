import type { Operator } from '../../types';
import { isMarchingObject, createMarchingObject, isMatrix } from '../../utils';

export const or: Operator = {
    definition: {
        exec: function*(s) { 
            const b = s.pop(), a = s.pop(); 

            if (isMatrix(a) || isMatrix(b)) {
                const op = (x, y) => (!!x || !!y) ? 1 : 0;
                if (isMatrix(a) && isMatrix(b)) {
                    const matA = a as any[][];
                    const matB = b as any[][];
                    if (matA.length !== matB.length || (matA.length > 0 && matA[0].length !== matB[0].length)) {
                        throw new Error('Matrix dimensions must match for element-wise logical OR.');
                    }
                    const result = matA.map((row, i) => 
                        row.map((val, j) => op(val, matB[i][j]))
                    );
                    s.push(result);
                    return;
                }
                if (isMatrix(a) && !isMatrix(b)) {
                    const matA = a as any[][];
                    const result = matA.map(row => row.map(val => op(val, b)));
                    s.push(result);
                    return;
                }
                if (!isMatrix(a) && isMatrix(b)) {
                    const matB = b as any[][];
                    const result = matB.map(row => row.map(val => op(a, val)));
                    s.push(result);
                    return;
                }
            }

            if (isMarchingObject(a) && isMarchingObject(b)) {
                s.push(createMarchingObject('union', 'combinator', [a, b]));
                return;
            }

            if (Array.isArray(a) && Array.isArray(b)) {
                const union = [...new Set([...a, ...b])];
                s.push(union);
                return;
            }

            s.push(a || b); 
        },
        description: 'Logical OR for booleans, an SDF union for two SDFs, element-wise logical OR for matrices (results in 0 or 1), or a set union for two lists.',
        effect: '[A B] -> [C]'
    },
    examples: [
        { code: 'true false or', expected: [true] },
        { code: 'false false or', expected: [false] },
        { code: '1 0 or', expected: [1] },
        { 
            code: '0.5 sphere 0.3 0.3 0.6 vec3 box or march render', 
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: 'A shader object rendering the union.'
        },
        { code: '((1 0)(0 1)) 0 or', expected: [[[1, 0], [0, 1]]]},
        { code: '(1 2 3) (2 3 4) or', expected: [[1, 2, 3, 4]] },
        { code: '(1 2) (3 4) or', expected: [[1, 2, 3, 4]] },
    ]
};