import type { Operator, EvaluateFn } from '../../types';

export const dip2: Operator = {
    definition: {
        exec: function*(s, options, evaluate: EvaluateFn) {
            const p = s.pop();
            const y = s.pop();
            const x = s.pop();
            yield* evaluate(p, s, options);
            s.push(x, y);
        },
        description: 'Saves two stack items, executes a program, then restores them.',
        effect: '[X Y [P]] -> [... X Y]'
    },
    examples: [
        { code: '1 2 (10 20 +) dip2', expected: [30, 1, 2] },
        { code: '1 2 () dip2', expected: [1, 2] },
    ]
};