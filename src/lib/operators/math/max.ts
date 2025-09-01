import type { Operator } from '../../types';

export const max: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.max(s.pop() ?? 0, s.pop() ?? 0)); },
        description: 'Pushes the maximum of the top two elements.',
        effect: '[N1 N2] -> [N]'
    },
    examples: [
        { code: '10 20 max', expected: [20] },
        { code: '-10 -20 max', expected: [-10] },
        { code: '10 max', expected: [10] },
        { code: 'max', expected: [0] }
    ]
};