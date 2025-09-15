

import type { Operator } from '../../types';

export const ahr: Operator = {
    definition: {
        exec: function*(s) {
            const release = s.pop() as number;
            const hold = s.pop() as number;
            const attack = s.pop() as number;

            if (typeof attack !== 'number' || typeof hold !== 'number' || typeof release !== 'number') {
                throw new Error('ahr expects attack, hold, and release times (in seconds).');
            }
            
            // This quotation will be interpreted by the audio worklet.
            s.push([attack, hold, release, 'gate_env']);
        },
        description: 'Creates a one-shot Attack-Hold-Release (AHR) envelope quotation. This is a self-triggering envelope useful for simple percussive or one-shot sounds without needing a separate gate signal.',
        effect: '[F_attack F_hold F_release] -> [L_quotation]'
    },
    examples: [
        {
            replCode: `
# A simple synth voice using a self-triggering AHR envelope
(
    440 sine          # Oscillator
    (0.01 0.1 0.5 ahr)  # AHR Envelope
    mul               # Apply envelope
)
0.5 mul 0.8 play # Apply gain and play
`,
            expected: []
        },
        { 
            code: "0.01 0.1 0.5 ahr",
            assert: (s) => Array.isArray(s[0]) && s[0][3] === 'gate_env'
        },
    ]
};
