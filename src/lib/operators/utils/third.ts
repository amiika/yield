import type { Operator } from '../../types';

export const third: Operator = {
    definition: {
        exec: function*(s) { const a = s.pop(); s.push(a.slice(2)[0]); s.push(a); },
        description: 'Pushes the third element of a list without consuming the list.',
        effect: '[L] -> [E L]'
    },
    examples: [
        { code: '(10 20 30) third', expected: [30, [10, 20, 30]] },
        { code: '"abc" third', expected: ["c", "abc"] },
    ]
};