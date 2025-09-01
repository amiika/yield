import type { Operator } from '../../types';

export const sine: Operator = {
    definition: {
        exec: function*(s) {
            const freq = s.pop();
            s.push(['sine', freq]);
        },
        description: 'Creates a sine wave oscillator node.',
        effect: '[F_freq] -> [L_graph]'
    },
    // FIX: Renamed 'testCases' to 'examples' to match the Operator type.
    examples: [
        { code: "440 sine 0.5 mul play", expected: [['mul', ['sine', 440], 0.5]] },
        { code: '440 sine', expected: [['sine', 440]] },
    ]
};