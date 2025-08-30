import type { Operator } from '../../types';

export const hpf: Operator = {
    definition: {
        exec: function*(s) {
            const resonance = s.pop();
            const cutoff = s.pop();
            const input = s.pop();
            s.push(['hpf', input, cutoff, resonance]);
        },
        description: 'Applies a high-pass filter to an audio signal node.',
        example: "noise 2000 0.2 hpf play",
        effect: '[L_graph F_cutoff F_resonance] -> [L_graph]'
    },
    testCases: [
        { code: "noise 2000 0.2 hpf", expected: [['hpf', ['noise'], 2000, 0.2]] },
    ]
};
