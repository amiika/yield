import type { Operator } from '../../types';
import { isMarchingObject, createMarchingObject, isMatrix } from '../../utils';

export const xor: Operator = {
    definition: {
        exec: function*(s) { 
            const b = s.pop(), a = s.pop();

            if (isMatrix(a) || isMatrix(b)) {
                const op = (x, y) => (!!x !== !!y) ? 1 : 0;
                if (isMatrix(a) && isMatrix(b)) {
                    const matA = a as any[][];
                    const matB = b as any[][];
                    if (matA.length !== matB.length || (matA.length > 0 && matA[0].length !== matB[0].length)) {
                        throw new Error('Matrix dimensions must match for element-wise logical XOR.');
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
                s.push(createMarchingObject('xor', 'combinator', [a, b]));
                return;
            }

            if (Array.isArray(a) && Array.isArray(b)) {
                const setA = new Set(a);
                const setB = new Set(b);
                const diffA = [...setA].filter(x => !setB.has(x));
                const diffB = [...setB].filter(x => !setA.has(x));
                s.push([...diffA, ...diffB]);
                return;
            }

            s.push(!!(a ^ b)); 
        },
        description: 'Logical XOR for booleans, an SDF combinator for two SDFs, element-wise logical XOR for matrices (results in 0 or 1), or a set symmetric difference for two lists.',
        effect: '[A B] -> [C]'
    },
    examples: [
        { code: 'true true xor', expected: [false] },
        { code: 'true false xor', expected: [true] },
        { code: '1 0 xor', expected: [true] },
        { 
            code: '0.5 sphere 0.3 0.3 0.3 vec3 box xor march render', 
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: 'A shader object rendering the XOR combination.'
        },
        { code: '((1 0)(1 0)) ((1 1)(0 0)) xor', expected: [[[0, 1], [1, 0]]]},
        { code: '(1 2 3) (2 3 4) xor', expected: [[1, 4]] },
        { code: '(1 2) (3 4) xor', expected: [[1, 2, 3, 4]] },
    ]
};