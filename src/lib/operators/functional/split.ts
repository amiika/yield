import type { Operator, EvaluateFn } from '../../types';

export const split: Operator = {
    definition: {
        exec: function*(s, options, evaluate: EvaluateFn) {
            const program = s.pop();
            const list = s.pop();
            if (!Array.isArray(list)) throw new Error('split expects a list.');

            const trueList = [];
            const falseList = [];

            for (const item of list) {
                const tempStack = [item];
                yield* evaluate(program, tempStack, options);
                if (tempStack.pop()) {
                    trueList.push(item);
                } else {
                    falseList.push(item);
                }
            }
            s.push(trueList, falseList);
        },
        description: 'Uses a predicate program to split a list into two lists: one for which the predicate was true, and one for which it was false. `A [B] -> A1 A2`',
        effect: '[L [P]] -> [L_true L_false]'
    },
    examples: [
        { code: '(1 2 3 4 5) (2 % 0 ==) split', expected: [[2, 4], [1, 3, 5]] },
        { code: '(1 2 3) (10 >) split', expected: [[], [1, 2, 3]] },
    ]
};