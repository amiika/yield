import type { Operator } from '../../types';

export const append: Operator = {
    definition: {
        exec: function*(s) { const e = s.pop(), l = s.pop(); if (!Array.isArray(l)) throw new Error('append expects a list'); l.push(e); s.push(l); },
        description: 'Appends an element to the end of a list (mutates the list).',
        effect: '[L E] -> [L\']'
    },
    examples: [
        { code: '[1 2] 3 append', expected: [[1, 2, 3]] },
        { code: '[] "a" append', expected: [["a"]] },
    ]
};