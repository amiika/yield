
import type { Operator } from '../../types';
import { deepClone } from '../../utils';

const audioOps = new Set(['sine', 'saw', 'pulse', 'tri', 'noise', 'lpf', 'hpf', 'ad', 'adsr', 'ahr', 'delay', 'distort', 'pan', 'note', 'seq', 'impulse', 'mix', 'mul', 'bd', 'sd', 'hh', 'lt', 'mt', 'ht', 'gate', 'oneshot', 'fm_synth', 'fm_simple', 'arp']);
const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string' && audioOps.has(v[v.length - 1]);

export const poly: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const programs = s.pop();
            const clockQuotation = s.pop();
            if (!Array.isArray(programs)) throw new Error('poly expects a list of programs.');
            if (!isAudioQuotation(clockQuotation)) throw new Error('poly expects a clock signal quotation.');

            const results = [];
            for (const program of programs) {
                const tempStack = [];
                // For each program, push a DEEP COPY of the clock, then evaluate the program.
                tempStack.push(deepClone(clockQuotation));
                yield* evaluate(program, tempStack, options);
                // Assume each voice program produces one audio quotation result
                results.push(...tempStack);
            }
            
            // If multiple results are generated, automatically mix them into a single quotation.
            if (results.length === 0) {
                return; // Nothing to push
            }
            if (results.length === 1) {
                s.push(results[0]);
                return;
            }

            let finalMix = results.pop();
            while(results.length > 0) {
                finalMix = [results.pop(), finalMix, 'mix'];
            }
            s.push(finalMix);
        },
        description: 'Applies a clock signal quotation to multiple program quotations to generate multiple audio quotations (voices), which are then automatically mixed into a single output quotation. If a program is a simple word that generates a quotation (like `bd`), it can be used directly without being wrapped in its own quotation.',
        effect: '[Clock_Quotation [Prog1 Prog2 ...]] -> [Mixed_Result_Quotation]'
    },
    examples: [
        {
            replCode: `8 impulse (hh sd bd) poly 0.8 mul start`,
            async: {
                duration: 500,
                assert: s => s.length === 0,
                assertDescription: "The simple drum machine should start playing."
            }
        },
        {
            replCode: `
120 tempo
8 impulse  # A 16th note master clock

(
    # Kick: 4 pulses over 16 steps
    ( 4 16 euclidean seq bd )

    # Snare: 5 pulses over 16 steps, quieter
    ( 5 16 euclidean seq sd 0.7 mul )

    # Hi-hat: 7 pulses over 16 steps, even quieter
    ( 7 16 euclidean seq hh 0.5 mul )
) poly

# The stack now has one mixed quotation.

# Apply master gain and play
0.8 mul start
`,
            async: {
                duration: 500,
                assert: s => s.length === 0,
                assertDescription: "The polyrhythmic drum machine should start playing."
            }
        },
        {
            replCode: `
# A single trigger for all voices
0.5 gate

(
    # A sine wave for the root note (C4)
    ( 60 note sine 0.5 mul )

    # A sawtooth wave for the major third (E4)
    ( 64 note saw 0.3 mul )

    # A triangle wave for the perfect fifth (G4)
    ( 67 note tri 0.3 mul )
) poly

# Play the automatically mixed chord for 1 beat
1.0 play
`,
            async: {
                duration: 1100, // wait for the sound to finish
                assert: s => s.length === 0,
                assertDescription: "A C-major chord with different waveforms should play."
            }
        },
        {
            replCode: `
120 tempo
# A clock for a simple 8th note pattern
8 impulse

(
    # A low tom panned to the left
    ( (1 0 0 1 0 0 0 0) seq lt -0.8 pan )

    # A mid tom panned to the right
    ( (0 0 1 0 0 1 0 0) seq mt 0.8 pan )
) poly

# Play the panned voices
0.8 mul start
`,
            async: {
                duration: 500,
                assert: s => s.length === 0,
                assertDescription: "Two tom sounds should be heard, panned left and right."
            }
        },
        {
            replCode: `
120 tempo
# The source sound: a simple arpeggio
8 impulse (60 64 67 72) seq note saw 0.2 mul

(
    # Voice 1: Dry signal, panned left
    ( -0.5 pan )

    # Voice 2: A distorted version, panned right
    ( 0.8 distort 0.5 pan )

    # Voice 3: A delayed version, in the center
    ( 0.375 0.6 delay 0.0 pan ) # 0.375s is a dotted eighth note at 120bpm
) poly

# All three processed voices are mixed automatically.

# Apply master gain and start
0.5 mul start
`,
            async: {
                duration: 500,
                assert: s => s.length === 0,
                assertDescription: "A layered synth arpeggio with different effects should start playing."
            }
        }
    ]
};
