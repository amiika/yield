

import type { Operator } from '../../types';

export const gate: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            const beats = s.pop() as number;
            if (typeof beats !== 'number' || beats < 0) {
                throw new Error('gate expects a non-negative number for duration in beats.');
            }

            const tempoDef = dictionary[':tempo'];
            const bpm = (tempoDef && 'body' in tempoDef && typeof tempoDef.body === 'number' ? tempoDef.body : 120) as number;
            const secondsPerBeat = 60.0 / bpm;
            const durationSeconds = beats * secondsPerBeat;

            // This quotation will be interpreted by the audio worklet.
            s.push([durationSeconds, 'gate']);
        },
        description: 'Creates a gate signal quotation. It produces a value of 1.0 for a specified duration (in beats), and 0.0 otherwise. This is ideal for triggering ADSR envelopes for notes with a specific length. It is tempo-aware.',
        effect: '[F_beats] -> [L_quotation]'
    },
    examples: [
        {
            replCode: `
# A synth voice using an ADSR envelope
(
    440 sine                                 # Oscillator
    (0.5 gate) 0.01 0.2 0.5 0.3 adsr mul # Apply ADSR envelope
)
0.5 mul 1.0 play # Apply gain and play for 1 beat
`,
            expected: []
        },
        {
            code: "0.5 gate",
            assert: (s) => Array.isArray(s[0]) && s[0][1] === 'gate'
        },
    ]
};
