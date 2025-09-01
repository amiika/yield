import type { Operator } from '../../types';

export const add: Operator = {
    definition: {
        exec: function*(s) { const b = s.pop(), a = s.pop(); s.push((a ?? 0) + (b ?? 0)); },
        description: 'Adds the top two elements.',
        effect: '[A B] -> [C]'
    },
    examples: [
        { code: '10 20 +', expected: [30] },
        { code: '-5 5 +', expected: [0] },
        { code: '1.5 2.5 +', expected: [4.0] },
        { code: '1 +', expected: [1] },
        { code: '+', expected: [0] },
        { code: '- + = 1 1 +', expected: [0]},
        
    ]
};