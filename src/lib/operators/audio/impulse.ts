import type { Operator } from '../../types';

export const impulse: Operator = {
    definition: {
        exec: function*(s) {
            const freq = s.pop();
            s.push(['impulse', freq]);
        },
        description: 'Creates a trigger impulse oscillator node at a given frequency (Hz).',
        example: "8 impulse 0.5 mul play",
        effect: '[F_freq] -> [L_graph]'
    },
    testCases: [
        { code: "8 impulse", expected: [['impulse', 8]] },
        {
            code: '8 impulse 0.5 mul',
            expected: [['mul', ['impulse', 8], 0.5]]
        }
    ]
};
