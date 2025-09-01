import type { Operator } from '../../types';

export const pulse: Operator = {
    definition: {
        exec: function*(s) {
            const duty = s.pop();
            const freq = s.pop();
            s.push(['pulse', freq, duty]);
        },
        description: 'Creates a pulse wave oscillator node.',
        effect: '[F_freq F_duty] -> [L_graph]'
    },
    // FIX: Renamed 'testCases' to 'examples' to match the Operator type.
    examples: [
        { code: "440 0.25 pulse 0.5 mul play", expected: [['mul', ['pulse', 440, 0.25], 0.5]] },
        { code: '440 0.25 pulse', expected: [['pulse', 440, 0.25]] },
    ]
};