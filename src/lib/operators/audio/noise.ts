import type { Operator } from '../../types';

export const noise: Operator = {
    definition: {
        exec: function*(s) {
            s.push(['noise']);
        },
        description: 'Creates a white noise generator node.',
        example: "noise 0.2 mul play",
        effect: '[] -> [L_graph]'
    },
    testCases: [
        { code: 'noise', expected: [['noise']] },
        {
            code: 'noise 0.2 mul',
            expected: [['mul', ['noise'], 0.2]]
        }
    ]
};
