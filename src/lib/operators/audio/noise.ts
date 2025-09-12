import type { Operator } from '../../types';

export const noise: Operator = {
    definition: {
        exec: function*(s) {
            s.push(['noise']);
        },
        description: 'Creates a white noise generator node.',
        effect: '[] -> [L_graph]'
    },
    examples: [
        { code: "noise 0.2 mul play", expected: [['mul', ['noise'], 0.2]] },
        { code: 'noise', expected: [['noise']] },
    ]
};
