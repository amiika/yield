import type { Operator, EvaluateFn } from '../../types';

export const fold: Operator = {
    definition: {
        exec: function*(s, options, evaluate: EvaluateFn) {
            const program = s.pop();
            let acc = s.pop();
            const list = s.pop();
            if (!Array.isArray(list)) throw new Error('fold expects a list.');

            for (const item of list) {
                const tempStack = [acc, item];
                yield* evaluate(program, tempStack, options);
                acc = tempStack.pop();
            }
            s.push(acc);
        },
        description: 'Starting with an initial value, sequentially applies a program to each member of a list to produce a final value. `A V0 [P] -> V`',
        example: '[1 2 3 4] 0 [+] fold',
        effect: '[L V [P]] -> [R]'
    },
    testCases: [
        { code: '[1 2 3 4] 0 [+] fold', expected: [10] },
        { code: '[2 3 4] 1 [*] fold', expected: [24] },
        { code: '[] 100 [+] fold', expected: [100] },
    ]
};