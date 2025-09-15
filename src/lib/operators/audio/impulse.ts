

import type { Operator } from '../../types';

export const impulse: Operator = {
    definition: {
        exec: function*(s) {
            const freq = s.pop();
            s.push([freq, 'impulse']);
        },
        description: 'Creates a trigger impulse oscillator quotation at a given frequency (Hz). Note: For safety, a raw impulse played directly will be silent. To hear it, you must apply a gain (e.g., `8 impulse 0.5 mul play`).',
        effect: '[F_freq] -> [L_quotation]'
    },
    examples: [
        {
            code: `# Layering instruments at different rates
2 impulse bd          # Bass drum at 2Hz (120bpm quarter notes)
4 impulse hh 0.5 mul  # Hi-hat at 4Hz (120bpm eighth notes)
mix 0.8 mul start      # Mix, apply master gain, and play`,
            expected: []
        },
        {
            code: `# Using impulse as a clock for sequencers
# Bass drum part
8 impulse (1 0 0 0 1 0 0 0) seq bd

# Snare drum part
8 impulse (0 0 1 0 0 0 1 0) seq sd

# Mix the two parts and play
mix 0.8 mul start`,
            expected: []
        },
        {
            replCode: `
120 tempo

# A 16th note master clock drives a multi-part drum machine.
# Bass drum plays 4 on the floor (4 pulses over 16 steps).
16 impulse 2 16 euclidean seq bd

# Snare drum plays a syncopated 3-pulse pattern.
16 impulse 3 16 euclidean seq sd 0.2 mul

# Hi-hat plays a busy 7-pulse pattern, with lower volume.
16 impulse 5 16 euclidean seq hh 0.2 mul

# Mix all three parts together and apply master gain.
mix mix 0.8 mul start`,
            async: {
                duration: 500,
                assert: s => s.length === 0,
                assertDescription: "The drum machine should start playing."
            }
        },
        {
            code: "8 impulse",
            expected: [[8, 'impulse']]
        },
    ],
    keywords: ['clock', 'trigger', 'gate'],
};
