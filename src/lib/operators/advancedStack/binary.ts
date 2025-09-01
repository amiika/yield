import type { Operator, EvaluateFn } from '../../types';

export const binary: Operator = {
    definition: {
        exec: function*(s, options, evaluate: EvaluateFn) {
            const p = s.pop();
            const y = s.pop();
            const x = s.pop();
            const tempStack = [x, y];
            yield* evaluate(p, tempStack, options);
            s.push(...tempStack);
        },
        description: 'Executes P with two values X and Y, leaving result R. Exactly two values are removed from the stack.',
        effect: '[... X Y [P]] -> [... R]'
    },
    examples: [
        { code: '10 20 30 [+] binary', expected: [10, 50] }
    ]
};