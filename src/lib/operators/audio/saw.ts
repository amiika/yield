import type { Operator } from '../../types';

export const saw: Operator = {
    definition: {
        exec: function*(s) {
            const freq = s.pop();
            s.push(['saw', freq]);
        },
        description: 'Creates a sawtooth wave oscillator node.',
        effect: '[F_freq] -> [L_graph]'
    },
    // FIX: Renamed 'testCases' to 'examples' to match the Operator type.
    examples: [
        { code: "440 saw 0.5 mul play", expected: [['mul', ['saw', 440], 0.5]] },
        { code: '440 saw', expected: [['saw', 440]] },
    ]
};