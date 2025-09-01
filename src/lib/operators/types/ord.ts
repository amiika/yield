import type { Operator } from '../../types';

export const ord: Operator = {
    definition: {
        exec: function*(s) { s.push(s.pop().charCodeAt(0)); },
        description: 'Pushes the character code of the first character of a string.',
        effect: '[S] -> [I]'
    },
    examples: [
        { code: '"A" ord', expected: [65] },
        { code: '"a" ord', expected: [97] },
    ]
};