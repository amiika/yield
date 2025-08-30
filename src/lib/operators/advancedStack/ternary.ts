import type { Operator, EvaluateFn } from '../../types';

export const ternary: Operator = {
    definition: {
        exec: function*(s, options, evaluate: EvaluateFn) {
            const p = s.pop();
            const z = s.pop();
            const y = s.pop();
            const x = s.pop();
            const tempStack = [x, y, z];
            yield* evaluate(p, tempStack, options);
            s.push(...tempStack);
        },
        description: 'Executes P with three values X, Y, and Z, leaving result R. Exactly three values are removed from the stack.',
        example: '10 20 30 40 [+ *] ternary',
        effect: '[... X Y Z [P]] -> [... R]'
    },
    testCases: [
        { code: '10 20 30 40 [+ *] ternary', expected: [10, 1400] }
    ]
};