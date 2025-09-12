import type { Operator } from '../../types';

export const cleave: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const p2 = s.pop();
            const p1 = s.pop();
            const x = s.pop();
            const s1 = [x];
            yield* evaluate(p1, s1, options);
            const s2 = [x];
            yield* evaluate(p2, s2, options);
            s.push(...s1, ...s2);
        },
        description: 'Applies two programs to the same value, leaving both results on the stack.',
        effect: '[X [P1] [P2]] -> [R1 R2]'
    },
    examples: [
        { code: '10 (dup *) (1 +) cleave', expected: [100, 11] },
        { code: '(1 2) (size) (first) cleave', expected: [2, 1] },
    ]
};