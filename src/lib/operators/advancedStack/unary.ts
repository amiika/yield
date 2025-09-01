import type { Operator, EvaluateFn } from '../../types';

export const unary: Operator = {
    definition: {
        exec: function*(s, options, evaluate: EvaluateFn) {
            const p = s.pop();
            const x = s.pop();
            const tempStack = [x];
            yield* evaluate(p, tempStack, options);
            s.push(...tempStack);
        },
        description: 'Executes P with one value X, leaving result R. Exactly one value is removed from the stack.',
        effect: '[... X [P]] -> [... R]'
    },
    examples: [
        { code: '10 20 [1 +] unary', expected: [10, 21] }
    ]
};