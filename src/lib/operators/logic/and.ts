import type { Operator } from '../../types';
import { isMarchingObject, createMarchingObject, isMatrix } from '../../utils';

export const and: Operator = {
    definition: {
        exec: function*(s) { 
            const b = s.pop(), a = s.pop(); 

            if (isMatrix(a) || isMatrix(b)) {
                const op = (x, y) => (!!x && !!y) ? 1 : 0;
                if (isMatrix(a) && isMatrix(b)) {
                    const matA = a as any[][];
                    const matB = b as any[][];
                    if (matA.length !== matB.length || (matA.length > 0 && matA[0].length !== matB[0].length)) {
                        throw new Error('Matrix dimensions must match for element-wise logical AND.');
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
                s.push(createMarchingObject('intersection', 'combinator', [a, b]));
                return;
            }
            
            if (Array.isArray(a) && Array.isArray(b)) {
                const setA = new Set(a);
                const setB = new Set(b);
                const intersection = [...setA].filter(x => setB.has(x));
                s.push(intersection);
                return;
            }
            
            s.push(a && b); 
        },
        description: 'Logical AND for booleans, an SDF intersection for two SDFs, element-wise logical AND for matrices (results in 0 or 1), or a set intersection for two lists.',
        effect: '[A B] -> [C]'
    },
    examples: [
        { code: 'true true and', expected: [true] },
        { code: 'true false and', expected: [false] },
        { code: '1 0 and', expected: [0] },
        { 
            code: '0.5 sphere 0.3 0.3 0.6 vec3 box and march render', 
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: 'A shader object rendering the intersection.'
        },
        { code: '((1 0)(5 1)) ((-1 2)(0 1)) and', expected: [[[1, 0], [0, 1]]]},
        { code: '(1 2 3) (2 3 4) and', expected: [[2, 3]] },
        { code: '(1 2) (3 4) and', expected: [[]] },
    ]
};