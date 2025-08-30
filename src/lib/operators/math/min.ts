import type { Operator } from '../../types';

export const min: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.min(s.pop() ?? 0, s.pop() ?? 0)); },
        description: 'Pushes the minimum of the top two elements.',
        example: '10 20 min',
        effect: '[N1 N2] -> [N]'
    },
    testCases: [
        { code: '10 20 min', expected: [10] },
        { code: '-10 -20 min', expected: [-20] },
        { code: '10 min', expected: [0] },
        { code: 'min', expected: [0] }
    ]
};