import type { Operator } from '../../types';

export const cond: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const cases = s.pop();
            if (!Array.isArray(cases) || cases.length === 0) return;
            const value = s[s.length - 1]; // Peek
            const defaultCase = cases.pop();
            for (const caseItem of cases) {
                if (!Array.isArray(caseItem) || caseItem.length !== 2) continue;
                const [condition, then] = caseItem;
                const tempStack = [value];
                yield* evaluate(condition, tempStack, options);
                if (tempStack.pop()) {
                    yield* evaluate(then, s, options);
                    return;
                }
            }
            if (Array.isArray(defaultCase) && defaultCase.length > 0) {
                yield* evaluate(defaultCase[0], s, options);
            }
        },
        description: 'Executes the program for the first true condition. The last element is the default case.',
        example: '2 [[ [1 ==] [pop "one"] ] [ [2 ==] [pop "two"] ] [ [pop "other"] ]] cond',
        effect: '[V [ [C1 T1] .. [D] ]] -> ...'
    },
    testCases: [
        { code: '2 [[ [1 ==] [pop "one"] ] [ [2 ==] [pop "two"] ] [ [pop "other"] ]] cond', expected: ["two"] },
        { code: '3 [[ [1 ==] [pop "one"] ] [ [2 ==] [pop "two"] ] [ [pop "other"] ]] cond', expected: ["other"] },
    ]
};