import type { Operator } from '../../types';

export const pulse: Operator = {
    definition: {
        exec: function*(s) {
            const duty = s.pop();
            const freq = s.pop();
            s.push(['pulse', freq, duty]);
        },
        description: 'Creates a pulse wave oscillator node.',
        example: "440 0.25 pulse 0.5 mul play",
        effect: '[F_freq F_duty] -> [L_graph]'
    },
    testCases: [
        { code: '440 0.25 pulse', expected: [['pulse', 440, 0.25]] },
        {
            code: '440 0.25 pulse 0.5 mul',
            expected: [['mul', ['pulse', 440, 0.25], 0.5]]
        }
    ]
};
