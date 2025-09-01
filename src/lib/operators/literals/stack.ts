import type { Operator } from '../../types';

export const stack: Operator = {
    definition: {
        exec: function*(s) { s.push([...s].reverse()); },
        description: 'Pushes a list representation of the current stack.',
        effect: '.. X Y Z -> .. X Y Z [Z Y X ..]'
    },
    examples: [
        { code: '1 2 3 stack', expected: [1, 2, 3, [3, 2, 1]] },
        { code: 'stack', expected: [[]] },
    ]
};