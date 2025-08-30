import type { Operator, EvaluateFn } from '../../types';

export const dip3: Operator = {
    definition: {
        exec: function*(s, options, evaluate: EvaluateFn) {
            const p = s.pop();
            const z = s.pop();
            const y = s.pop();
            const x = s.pop();
            yield* evaluate(p, s, options);
            s.push(x, y, z);
        },
        description: 'Saves three stack items, executes a program, then restores them.',
        example: '1 2 3 [10 20 +] dip3',
        effect: '[X Y Z [P]] -> [... X Y Z]'
    },
    testCases: [
        { code: '1 2 3 [10 20 +] dip3', expected: [30, 1, 2, 3] },
        { code: '10 20 1 2 3 [+] dip3', expected: [30, 1, 2, 3] }
    ]
};