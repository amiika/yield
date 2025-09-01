import type { Operator } from '../../types';

export const sin: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.sin(s.pop())); },
        description: 'Sine.',
        effect: '[F] -> [G]'
    },
    examples: [
        { code: '0.5 sin', expected: [0.479425538604203] },
        { code: '0 sin', expected: [0] },
    ]
};