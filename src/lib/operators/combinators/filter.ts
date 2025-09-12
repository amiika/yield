import type { Operator } from '../../types';

export const filter: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const [p, l] = [s.pop(), s.pop()];
            const results = [];
            for (const item of l) {
                const tempStack = [item];
                yield* evaluate([...p], tempStack, options);
                if (tempStack.pop()) {
                    results.push(item);
                }
            }
            s.push(results);
        },
        description: 'Creates a new list containing only elements for which a program returns true.',
        effect: '[L [P]] -> [L\']'
    },
    examples: [
        { code: '(1 2 3 4 5) (2 % 0 ==) filter', expected: [[2, 4]] },
        { code: '("a" "b" 1 2) (string?) filter', expected: [["a", "b"]] },
    ]
};