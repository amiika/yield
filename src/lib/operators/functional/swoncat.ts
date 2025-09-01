import type { Operator } from '../../types';

export const swoncat: Operator = {
    definition: {
        exec: function*(s) {
            const b = s.pop();
            const a = s.pop();
            // With stack [..., A, B], B is on top.
            // swoncat is equivalent to swap then concat.
            // swap -> [..., B, A]. A is on top.
            // concat pops A, then B, and computes B.concat(A).
            // Our popped b is B and a is A. We should compute b.concat(a).
            s.push(b.concat(a));
        },
        description: 'Concatenates two sequences (lists or strings) after swapping them. Equivalent to `swap concat`.',
        effect: '[S T] -> [U]'
    },
    // FIX: Renamed `testCases` to `examples` to match the Operator type.
    examples: [
        { code: '[1 2] [3 4] swoncat', expected: [[3, 4, 1, 2]] },
        { code: '"world" "hello" swoncat', expected: ["helloworld"] },
        { code: '[] [1] swoncat', expected: [[1]] },
        { code: '[1] [] swoncat', expected: [[1]] },
        { code: '"a" "b" swoncat', expected: ["ba"] },
    ]
};