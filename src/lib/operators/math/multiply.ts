import type { Operator } from '../../types';

export const multiply: Operator = {
    definition: {
        exec: function*(s) { const b = s.pop(), a = s.pop(); s.push((a ?? 0) * (b ?? 0)); },
        description: 'Multiplies the top two elements.',
        effect: '[A B] -> [C]'
    },
    examples: [
        { code: '10 5 *', expected: [50] },
        { code: '-10 5 *', expected: [-50] },
        { code: '5 *', expected: [0] },
        { code: '*', expected: [0] }
    ]
};