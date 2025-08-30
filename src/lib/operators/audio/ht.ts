import type { Operator } from '../../types';

export const ht: Operator = {
    definition: {
        exec: function*(s) {
            let gate;
            if (s.length > 0 && Array.isArray(s[s.length - 1])) {
                gate = s.pop();
            } else {
                gate = ['oneshot'];
            }

            // --- Parameters ---
            const base_freq = 250;

            // --- Graph ---

            // Pitch envelope. Gate is shallow-cloned to ensure a separate state.
            const pitch_env = ['ad', [...gate], 0.001, 0.08];
            const freq = ['mix', base_freq, ['mul', pitch_env, base_freq * 1.5]];

            // Oscillator
            const osc = ['sine', freq];

            // Amplitude envelope
            const amp_env = ['ad', gate, 0.001, 0.3];
            
            // Final Output
            const final_sound = ['mul', ['mul', osc, amp_env], 0.9];
            
            s.push(final_sound);
        },
        description: 'Creates a high tom synth node. If a gate signal is on the stack, it is used for triggering. Otherwise, the sound is triggered once immediately.',
        example: "ht play   # Single hit\n2 impulse ht play # Repeating hit",
        effect: '[L_gate]? -> [L_graph]'
    },
    testCases: [
        { 
            code: 'ht',
            assert: (s) => s.length === 1 && Array.isArray(s[0]) && s[0][0] === 'mul',
            expectedDescription: 'A valid audio graph'
        },
        { 
            code: '1 impulse ht',
            assert: (s) => s.length === 1 && Array.isArray(s[0]) && s[0][0] === 'mul',
            expectedDescription: 'A valid audio graph'
        },
    ]
};
