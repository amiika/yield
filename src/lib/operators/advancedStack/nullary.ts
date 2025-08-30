import type { Operator, EvaluateFn } from '../../types';

export const nullary: Operator = {
    definition: {
        exec: function*(s, options, evaluate: EvaluateFn) {
            const p = s.pop();
            const tempStack = [];
            yield* evaluate(p, tempStack, options);
            s.push(...tempStack);
        },
        description: 'Executes a program P, which leaves a result R on the stack. No matter how many parameters P consumes, none are removed from the original stack.',
        example: '10 20 [1 1 +] nullary',
        effect: '[... [P]] -> [... R]'
    },
    testCases: [
        { code: '10 20 [1 1 +] nullary', expected: [10, 20, 2] }
    ]
};
