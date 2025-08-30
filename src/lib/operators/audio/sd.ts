import type { Operator } from '../../types';

export const sd: Operator = {
    definition: {
        exec: function*(s) {
            let gate;
            if (s.length > 0 && Array.isArray(s[s.length - 1])) {
                gate = s.pop();
            } else {
                gate = ['oneshot'];
            }
            
            // Body of the snare - two triangle waves
            const osc1 = ['triangle', 220];
            const osc2 = ['triangle', 180];
            const body = ['mul', ['mix', osc1, osc2], 0.5];

            // Noise component - the "snap". Gate is shallow-cloned to ensure separate state.
            const noise_env = ['ad', [...gate], 0.001, 0.1];
            const noise = ['mul', ['hpf', ['noise'], 1000, 0.5], noise_env];

            // Mix body and noise
            const mixed = ['mix', body, ['mul', noise, 0.8]];

            // Final amplitude envelope
            const amp_env = ['ad', gate, 0.001, 0.2];

            const final_sound = ['mul', ['mul', mixed, amp_env], 0.9];

            s.push(final_sound);
        },
        description: 'Creates a snare drum synth node. If a gate signal is on the stack, it is used for triggering. Otherwise, the sound is triggered once immediately.',
        example: "sd play   # Single hit\n2 impulse sd play # Repeating hit",
        effect: '[L_gate]? -> [L_graph]'
    },
    testCases: [
        { 
            code: 'sd', 
            assert: (s) => s.length === 1 && Array.isArray(s[0]) && s[0][0] === 'mul',
            expectedDescription: 'A valid audio graph'
        },
        { 
            code: '1 impulse sd', 
            assert: (s) => s.length === 1 && Array.isArray(s[0]) && s[0][0] === 'mul',
            expectedDescription: 'A valid audio graph'
        },
    ]
};