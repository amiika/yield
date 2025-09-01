import type { Operator } from '../../types';

export const modulo: Operator = {
    definition: {
        exec: function*(s) { const b = s.pop(), a = s.pop(); s.push((a ?? 0) % (b ?? 0)); },
        description: 'Modulo operator. Pushes the remainder of A / B.',
        effect: '[A B] -> [C]'
    },
    examples: [
        { code: '10 3 %', expected: [1] },
        { code: '-10 3 %', expected: [-1] },
        { code: '10 %', expected: [0] }
    ]
};