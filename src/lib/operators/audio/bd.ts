import type { Operator } from '../../types';

export const bd: Operator = {
    definition: {
        exec: function*(s) {
            let gate;
            // Check if top of stack is a potential gate signal (an array representing a graph node)
            if (s.length > 0 && Array.isArray(s[s.length - 1])) {
                gate = s.pop();
            } else {
                // Otherwise, create a default single-shot trigger
                gate = ['oneshot'];
            }

            // Pitch envelope - a fast sweep down. Gate is shallow-cloned to ensure a separate state.
            const pitch_env = ['ad', [...gate], 0.001, 0.1];
            const freq = ['mix', 60, ['mul', pitch_env, 200]];

            // Oscillator
            const osc = ['sine', freq];

            // Amplitude envelope
            const amp_env = ['ad', gate, 0.001, 0.4];

            // Final sound with gain
            const final_sound = ['mul', ['mul', osc, amp_env], 1.0];
            
            s.push(final_sound);
        },
        description: 'Creates a bass drum synth node. If a gate signal is on the stack, it is used for triggering. Otherwise, the sound is triggered once immediately.',
        effect: '[L_gate]? -> [L_graph]'
    },
    examples: [
        { 
            code: "bd play",
            assert: (s) => s.length === 1 && Array.isArray(s[0]) && s[0][0] === 'mul',
            expectedDescription: 'A valid audio graph'
        },
        { 
            code: '2 impulse bd play', 
            assert: (s) => s.length === 1 && Array.isArray(s[0]) && s[0][0] === 'mul',
            expectedDescription: 'A valid audio graph'
        },
    ]
};