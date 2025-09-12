import type { Operator } from '../../types';

export const second: Operator = {
    definition: {
        exec: function*(s) { const a = s.pop(); s.push(a.slice(1)[0]); s.push(a); },
        description: 'Pushes the second element of a list without consuming the list.',
        effect: '[L] -> [E L]'
    },
    examples: [
        { code: '(10 20 30) second', expected: [20, [10, 20, 30]] },
        { code: '"abc" second', expected: ["b", "abc"] },
    ]
};