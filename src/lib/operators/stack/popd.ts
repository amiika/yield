import type { Operator } from '../../types';

export const popd: Operator = {
    definition: {
        exec: function*(s) { const y = s.pop(); s.pop(); s.push(y); },
        description: 'Like pop, but removes the second element from the stack.',
        effect: '[X Y] -> [Y]'
    },
    examples: [
        { code: '1 2 3 popd', expected: [1, 3] },
        { code: '"a" "b" "c" popd', expected: ['a', 'c'] },
    ]
};