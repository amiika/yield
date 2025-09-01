import type { Operator } from '../../types';

export const map: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const [p, l] = [s.pop(), s.pop()];
            const results = [];
            for (const item of l) {
                const tempStack = [item];
                yield* evaluate([...p], tempStack, options);
                results.push(...tempStack);
            }
            s.push(results);
        },
        description: 'Applies a program to each element of a list, creating a new list of results.',
        effect: '[L [P]] -> [L\']'
    },
    examples: [
        { code: '[1 2 3 4] [dup *] map', expected: [[1, 4, 9, 16]] },
        { code: '[] [succ] map', expected: [[]] },
    ]
};