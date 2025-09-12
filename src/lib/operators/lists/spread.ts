import type { Operator } from '../../types';

export const spread: Operator = {
    definition: {
        exec: function*(s) { const v = s.pop(); Array.isArray(v) ? s.push(...v) : s.push(v); },
        description: 'Spreads the elements of a list onto the stack.',
        effect: '[[A B]] -> [A B]'
    },
    examples: [
        { code: '(10 20 30) spread', expected: [10, 20, 30] },
        { code: '() spread', expected: [] },
    ]
};