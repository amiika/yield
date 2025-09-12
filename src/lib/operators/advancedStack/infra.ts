import type { Operator, EvaluateFn } from '../../types';

export const infra: Operator = {
    definition: {
        exec: function*(s, options, evaluate: EvaluateFn) {
            const program = s.pop();
            const list = s.pop();
            if (!Array.isArray(list)) throw new Error('infra expects a list to be used as the stack.');

            // The first element of the list is treated as the top of the stack for execution.
            const tempStack = [...list].reverse();
            yield* evaluate(program, tempStack, options);

            // The result is a new list, with the top of the temp stack as its first element.
            s.push([...tempStack].reverse());
        },
        description: 'Using list L1 as a temporary stack, executes program P and returns a new list L2. The first element of L1 is the top of the stack.',
        effect: '[L1 [P]] -> [L2]'
    },
    examples: [
        { code: '(10 20) (dup *) infra', expected: [[100, 20]] }
    ]
};