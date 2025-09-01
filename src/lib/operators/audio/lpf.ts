import type { Operator } from '../../types';

export const lpf: Operator = {
    definition: {
        exec: function*(s) {
            const resonance = s.pop();
            const cutoff = s.pop();
            const input = s.pop();
            s.push(['lpf', input, cutoff, resonance]);
        },
        description: 'Applies a low-pass filter to an audio signal node.',
        effect: '[L_graph F_cutoff F_resonance] -> [L_graph]'
    },
    // FIX: Renamed 'testCases' to 'examples' to match the Operator type.
    examples: [
        { code: "220 saw 800 0.5 lpf play", expected: [['lpf', ['saw', 220], 800, 0.5]] },
    ]
};