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
        effect: '[L_graph F_cutoff F_resonance] -> [L_graph]'
    },
    examples: [
        { code: "noise 2000 0.2 hpf play", expected: [['hpf', ['noise'], 2000, 0.2]] },
    ]
};
