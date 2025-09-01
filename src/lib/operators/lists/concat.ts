import type { Operator } from '../../types';

export const concat: Operator = {
    definition: {
        exec: function*(s) { const b = s.pop(), a = s.pop(); s.push(a.concat(b)); },
        description: 'Concatenates two lists or strings.',
        effect: '[S T] -> [U]'
    },
    examples: [
        { code: '[1 2] [3 4] concat', expected: [[1, 2, 3, 4]] },
        { code: '"hello " "world" concat', expected: ["hello world"] },
        { code: '[1] [] concat', expected: [[1]] },
    ]
};