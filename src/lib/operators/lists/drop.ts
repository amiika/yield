import type { Operator } from '../../types';

export const drop: Operator = {
    definition: {
        exec: function*(s) { const n = s.pop(), a = s.pop(); s.push(a.slice(n)); },
        description: 'Removes the first N elements from a list.',
        effect: '[A N] -> [B]'
    },
    examples: [
        { code: '(1 2 3 4 5) 2 drop', expected: [[3, 4, 5]] },
        { code: '"hello" 3 drop', expected: ["lo"] },
    ]
};