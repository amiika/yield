

import type { Operator } from '../../types';

const audioOps = new Set(['sine', 'saw', 'pulse', 'tri', 'noise', 'lpf', 'hpf', 'ad', 'adsr', 'delay', 'distort', 'pan', 'note', 'seq', 'impulse', 'mix', 'mul', 'fm', 'gate']);
const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string' && audioOps.has(v[v.length - 1]);

export const adsr: Operator = {
    definition: {
        exec: function*(s) {
            const release = s.pop();
            const sustain = s.pop();
            const decay = s.pop();
            const attack = s.pop();
            const gate = s.pop();
            const gateOperand = isAudioQuotation(gate) ? gate : gate;
            s.push([gateOperand, attack, decay, sustain, release, 'adsr']);
        },
        description: 'Creates an Attack-Decay-Sustain-Release (ADSR) envelope quotation. It shapes a signal based on a gate input.',
        effect: '[S_gate F_a F_d F_s F_r] -> [L_quotation]'
    },
    examples: [
        { 
            replCode: `
# A basic synth note using ADSR.
# The note is played for longer than the gate to hear the release phase.
440 sine                                 # The sound source
(0.5 gate) 0.01 0.2 0.5 0.3 adsr mul # Create a gate, feed it to ADSR, and apply to the sine wave
0.5 mul 1.0 play                         # Apply master gain and play
`,
            expected: [] 
        },
        {
            replCode: `
# Using ADSR with a simple, custom 2-operator FM patch.
# The sound is a simple metallic tone.
220 440 250 :sine :sine fm

# The gate signal will last for 1 beat.
1.0 gate

# The ADSR has a long attack and release.
0.4 0.2 0.5 0.8 adsr

# Apply the envelope to the sound, add master gain, and play.
# Play for 2 beats to hear the full release tail.
mul 0.4 mul 2.0 play
`,
            expected: []
        },
        {
            replCode: `
# Using one gate signal to drive both a predefined patch and an external ADSR.
120 tempo

# Create a gate signal that lasts 2 beats and duplicate it.
2.0 gate dup

# The first gate signal is used to trigger the bass patch.
# The patch has its own percussive envelope, but we're holding the note.
swap 48 0.9 :bass synth

# The second gate signal is used for our external ADSR "filter" envelope.
# This creates a "wah" effect by controlling the low-pass filter's cutoff.
0.8 0.5 0.1 0.8 adsr  # A slow-opening envelope
2000 * 200 +           # Map the 0-1 envelope to a 200-2200 Hz cutoff range

# Apply the ADSR-controlled filter to the bass sound.
0.7 lpf # Resonance

# Add gain and play for long enough to hear the full effect.
0.5 mul 3.0 play
`,
            expected: []
        },
        { 
            code: "1 0.1 0.2 0.5 0.3 adsr",
            assert: (s) => s.length === 1 && Array.isArray(s[0]) && s[0].length === 6
        },
    ]
};
