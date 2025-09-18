
import type { Operator, GLSLExpression } from '../../types';
import { isMatrix } from '../../utils';

const isVector = (v: any): v is number[] => Array.isArray(v) && !isMatrix(v) && v.every(el => typeof el === 'number');
const isGLSLExpression = (v: any): v is GLSLExpression => v?.type === 'glsl_expression';

// Helper to convert a numeric matrix to a GLSL string representation.
const numericMatrixToGLSL = (mat: number[][]): string => {
    if (!isMatrix(mat)) return '';
    const rows = mat.length;
    if (rows === 0) return '';
    const cols = mat[0].length;
    if (rows !== cols || (rows !== 3 && rows !== 4)) return ''; // Only 3x3 or 4x4
    
    // Transpose for column-major order in GLSL constructor
    const transposed = mat[0].map((_, colIndex) => mat.map(row => row[colIndex]));
    const flat = transposed.flat();
    
    const glslNum = (v: number) => { // local numToGLSL
        const s = v.toString();
        if (Number.isInteger(v) && !s.includes('e') && !s.includes('.')) return s + '.0';
        return s;
    };
    
    if (rows === 3) return `mat3(${flat.map(glslNum).join(', ')})`;
    if (rows === 4) return `mat4(${flat.map(glslNum).join(', ')})`;
    return '';
};

export const matmul: Operator = {
    definition: {
        exec: function*(s) {
            const b = s.pop();
            const a = s.pop();

            const isADynamic = isGLSLExpression(a) && (a.returnType === 'mat3' || a.returnType === 'mat4');
            const isBDynamic = isGLSLExpression(b) && (b.returnType === 'mat3' || b.returnType === 'mat4');

            if (isADynamic || isBDynamic) {
                // --- Dynamic GLSL Matrix Multiplication ---
                const a_code = isADynamic ? `(${a.code})` : numericMatrixToGLSL(a);
                const b_code = isBDynamic ? `(${b.code})` : numericMatrixToGLSL(b);
                
                if (!a_code || !b_code) {
                    throw new Error('matmul: Could not generate GLSL for one of the operands.');
                }

                // In GLSL, for transform T = T2 * T1, the matrix multiplication is M = M2 * M1.
                // Our stack order is [A, B], and we compute A * B.
                const new_code = `(${a_code} * ${b_code})`; 
                
                // Determine return type (mat3 * mat3 -> mat3, mat4 * mat4 -> mat4)
                const returnType = isADynamic ? a.returnType : (isBDynamic ? b.returnType : 'mat3');
                
                s.push({
                    type: 'glsl_expression',
                    code: new_code,
                    returnType: returnType
                });
                return;
            }

            let matA: number[][];
            let matB: number[][];
            
            const wasAVector = isVector(a);
            const wasBVector = isVector(b);
            const isAMatrix = isMatrix(a);
            const isBMatrix = isMatrix(b);

            if (wasAVector && wasBVector) {
                throw new Error('matmul on two vectors is ambiguous. Use `dot` for dot product.');
            }

            if (isAMatrix) {
                matA = a as number[][];
            } else if (wasAVector) {
                matA = [a as number[]]; // Treat as row vector
            } else {
                throw new Error('matmul: first operand must be a matrix or a vector.');
            }

            if (isBMatrix) {
                matB = b as number[][];
            } else if (wasBVector) {
                matB = (b as number[]).map(el => [el]); // Treat as column vector
            } else {
                throw new Error('matmul: second operand must be a matrix or a vector.');
            }

            const rowsA = matA.length;
            const colsA = matA[0]?.length || 0;
            const rowsB = matB.length;
            const colsB = matB[0]?.length || 0;

            if (colsA !== rowsB) {
                throw new Error(`Matrix multiplication dimension mismatch: A is ${rowsA}x${colsA}, B is ${rowsB}x${colsB}.`);
            }
            
            if (colsA === 0 || rowsA === 0 || colsB === 0) {
                s.push([]);
                return;
            }

            const result: number[][] = Array.from({ length: rowsA }, () => Array(colsB).fill(0));

            for (let i = 0; i < rowsA; i++) {
                for (let j = 0; j < colsB; j++) {
                    let sum = 0;
                    for (let k = 0; k < colsA; k++) {
                        sum += matA[i][k] * matB[k][j];
                    }
                    result[i][j] = sum;
                }
            }

            // If the result is effectively a vector (either a single row or single column matrix),
            // flatten it to a simple list for consistency.
            if (result.length === 1) { // Row vector
                s.push(result[0]);
            } else if (result[0]?.length === 1) { // Column vector
                s.push(result.map(row => row[0]));
            } else { // It's a matrix
                s.push(result);
            }
        },
        description: 'Performs matrix multiplication. Can multiply matrix by matrix, vector by matrix (row vector), or matrix by vector (column vector). It also supports combining dynamic `glsl_expression` matrices for animated shaders. Alias: `@`.',
        effect: '[A B] -> [C]'
    },
    examples: [
        {
            code: `
# 1. Start with a Torus
0.8 0.2 vec2 torus

# 2. Create a dynamic rotation matrix around a tilted axis
(t 0.5 *) glsl  # angle animates
1 1 0 vec3      # tilted axis
matrot

# 3. Create a dynamic, non-uniform scaling matrix
(t sin 0.2 * 1 +) glsl  # sx: pulses between 0.8 and 1.2
(t cos 0.2 * 1 +) glsl  # sy: pulses out of phase with sx
1.0                       # sz: static
scalemat

# 4. Multiply the rotation and scaling matrices into ONE final matrix
# The order matters: R * S applies scaling first, then rotation.
matmul

# 5. Apply the combined transformation
transform

# 6. Apply an animated procedural material
(p 5 * t +) glsl cnoise material

# 7. Set up the scene with lighting and render
march
2 2 5 vec3 "white" 0.1 light
render`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: 'A shader object rendering a torus that simultaneously rotates and pulses in size, textured with animated noise.'
        },
        // Matrix x Matrix
        { code: '((1 2)(3 4)) ((10 20)(30 40)) matmul', expected: [[[70, 100], [150, 220]]] },
        // Vector x Matrix
        { code: '(1 2) ((10 20)(30 40)) matmul', expected: [[70, 100]] },
        // Matrix x Vector
        { code: '((1 2)(3 4)) (10 30) matmul', expected: [[70, 150]] },
        // Mismatch error
        { code: '((1 2)(3 4)) ((1)(2)(3)) matmul', expectedError: 'dimension mismatch' },
        // Vector x Vector error
        { code: '(1 2) (3 4) matmul', expectedError: 'ambiguous' },
    ]
};