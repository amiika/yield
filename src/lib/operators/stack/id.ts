import type { Operator } from '../../types';

export const id: Operator = {
    definition: {
        exec: function*(s) {},
        description: 'Identity function. Does nothing.',
        effect: '[X] -> [X]'
    },
    examples: [
        { code: '42 id', expected: [42] },
        { code: '(1 2 3) id', expected: [[1, 2, 3]] },
    ]
};