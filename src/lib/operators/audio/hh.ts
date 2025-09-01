import type { Operator } from '../../types';

export const hh: Operator = {
    definition: {
        exec: function*(s) {
            let gate;
            if (s.length > 0 && Array.isArray(s[s.length - 1])) {
                gate = s.pop();
            } else {
                gate = ['oneshot'];
            }

            // --- Parameters ---
            const decay = 0.05;   // Very short decay for a closed hat
            const cutoff = 8000;  // High-pass filter cutoff
            const gain = 0.5;

            // --- Graph ---

            // 1. Envelope
            const amp_env = ['ad', gate, 0.001, decay];

            // 2. Noise Source + High-Pass Filter
            const filtered_noise = ['hpf', ['noise'], cutoff, 0.1];

            // 3. Final Output
            const final_sound = ['mul', ['mul', filtered_noise, amp_env], gain];

            s.push(final_sound);
        },
        description: 'Creates a closed hi-hat synth node. If a gate signal is on the stack, it is used for triggering. Otherwise, the sound is triggered once immediately.',
        effect: '[L_gate]? -> [L_graph]'
    },
    examples: [
        {
            code: 'hh play',
            assert: (s) => s.length === 1 && Array.isArray(s[0]) && s[0][0] === 'mul',
            expectedDescription: 'A valid audio graph'
        },
        {
            code: '8 impulse hh play',
            assert: (s) => s.length === 1 && Array.isArray(s[0]) && s[0][0] === 'mul',
            expectedDescription: 'A valid audio graph'
        },
    ]
};