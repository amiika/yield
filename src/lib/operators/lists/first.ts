import type { Operator } from '../../types';

export const first: Operator = {
    definition: {
        exec: function*(s) { s.push(s.pop()[0]); },
        description: 'Gets the first element of a list.',
        effect: '[[A B]] -> [A]'
    },
    examples: [
        { code: '(10 20 30) first', expected: [10] },
        { code: '((1 2) 3) first', expected: [[1, 2]] },
    ]
};