import type { Operator, EvaluateFn } from '../../types';

export const some: Operator = {
    definition: {
        exec: function*(s, options, evaluate: EvaluateFn) {
            const program = s.pop();
            const list = s.pop();
            if (!Array.isArray(list)) throw new Error('some expects a list.');

            for (const item of list) {
                const tempStack = [item];
                yield* evaluate(program, tempStack, options);
                if (tempStack.pop()) {
                    s.push(true);
                    return;
                }
            }
            s.push(false);
        },
        description: 'Applies a predicate to each member of a list, returning true if the predicate returns true for any member.',
        effect: '[L [P]] -> [bool]'
    },
    examples: [
        { code: '(1 2 3 4) (3 >) some', expected: [true] },
        { code: '(1 2 3 4) (5 >) some', expected: [false] },
        { code: '() (true) some', expected: [false] },
    ]
};