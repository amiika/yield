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
        example: "220 saw 800 0.5 lpf play",
        effect: '[L_graph F_cutoff F_resonance] -> [L_graph]'
    },
    testCases: [
        { code: "220 saw 800 0.5 lpf", expected: [['lpf', ['saw', 220], 800, 0.5]] },
    ]
};
