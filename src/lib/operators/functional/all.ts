import type { Operator, EvaluateFn } from '../../types';

export const all: Operator = {
    definition: {
        exec: function*(s, options, evaluate: EvaluateFn) {
            const program = s.pop();
            const list = s.pop();
            if (!Array.isArray(list)) throw new Error('all expects a list.');

            for (const item of list) {
                const tempStack = [item];
                yield* evaluate(program, tempStack, options);
                if (!tempStack.pop()) {
                    s.push(false);
                    return;
                }
            }
            s.push(true);
        },
        description: 'Applies a predicate to each member of a list, returning true only if the predicate returns true for all members.',
        example: '[2 4 6] [2 % 0 ==] all',
        effect: '[L [P]] -> [bool]'
    },
    testCases: [
        { code: '[2 4 6] [2 % 0 ==] all', expected: [true] },
        { code: '[2 4 7] [2 % 0 ==] all', expected: [false] },
        { code: '[] [false] all', expected: [true] },
    ]
};