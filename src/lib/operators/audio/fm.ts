


import type { Operator } from '../../types';

const audioOps = new Set(['sine', 'saw', 'pulse', 'noise', 'lpf', 'hpf', 'ad', 'adsr', 'delay', 'distort', 'pan', 'note', 'seq', 'impulse', 'mix', 'mul']);
const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string' && audioOps.has(v[v.length - 1]);

// The main, user-facing 'fm' operator.
export const fm: Operator = {
    definition: {
        exec: function*(s) {
            const top = s.length > 0 ? s[s.length - 1] : undefined;
            const second = s.length > 1 ? s[s.length - 2] : undefined;
            const third = s.length > 2 ? s[s.length - 3] : undefined;

            // Complex DX7 mode detection: [gate]? [baseFreq] [velocity] [op_defs] [algo_id] fm
            if (typeof top === 'number' && Array.isArray(second) && typeof third === 'number') {
                const algorithmId = s.pop() as number;
                let opDefs = s.pop() as any[][]; // Make mutable
                const velocity = s.pop() as number;
                const baseFreq = s.pop();
                
                let gate;
                // Check if a gate signal was provided
                if (s.length > 0 && isAudioQuotation(s[s.length - 1])) {
                    gate = s.pop();
                } else {
                    // If not, create a default one-shot trigger
                    gate = ['oneshot'];
                }

                if (!Array.isArray(opDefs) || opDefs.length !== 6) {
                    throw new Error(`fm (complex) expects 6 operator definitions.`);
                }
                
                // Convert symbols in opDefs to strings before creating the quotation
                opDefs = opDefs.map(def => {
                    if (Array.isArray(def)) {
                        return def.map(item => {
                            if (typeof item === 'symbol') {
                                const key = Symbol.keyFor(item);
                                if (key) return key; // Convert :sine to "sine"
                            }
                            // Also handle the `[:fixed, freq]` case
                            if (Array.isArray(item) && item.length === 2 && typeof item[0] === 'symbol') {
                                const key = Symbol.keyFor(item[0]);
                                if (key) return [key, item[1]]; // Convert [:fixed, N] to ["fixed", N]
                            }
                            return item;
                        });
                    }
                    return def;
                });
                
                const gateOperand = isAudioQuotation(gate) ? gate : gate;
                const freqOperand = isAudioQuotation(baseFreq) || typeof baseFreq === 'symbol' ? baseFreq : baseFreq;
                s.push([gateOperand, freqOperand, velocity, opDefs, algorithmId, 'fm_synth']);
                return;
            }

            // Simple 2-operator FM mode: [carrier_freq] [mod_freq] [mod_index] [:carrier] [:mod] fm
            const mod_wave_sym = s.pop();
            const carrier_wave_sym = s.pop();
            const mod_index = s.pop();
            const mod_freq = s.pop();
            const carrier_freq = s.pop();
            
            const carrierOperand = isAudioQuotation(carrier_freq) ? carrier_freq : carrier_freq;
            s.push([carrierOperand, mod_freq, mod_index, carrier_wave_sym, mod_wave_sym, 'fm_simple']);
        },
        description: `A versatile FM synthesis operator that creates an audio quotation.
- **Simple Mode**: \`carrier_freq mod_freq mod_index :carrier_wave :mod_wave fm -> quotation\`. Creates a simple 2-operator FM quotation.
- **Complex Mode**: \`[gate_quotation]? baseFreq velocity [op_defs] algo_id fm -> quotation\`. Creates a 6-operator DX7-style FM quotation. If the optional gate is omitted, a default one-shot trigger is used.`,
        effect: `[...] -> [L_quotation]`
    },
    examples: [
        {
            replCode: '440 220 400 :sine :sine fm 0.5 mul 0.25 play',
            async: {
                duration: 100,
                assert: s => s.length === 0,
                assertDescription: "Stack should be empty after playing."
            }
        },
        {
            replCode: `
# Use a single trigger for a one-shot sound by omitting the gate
60 note 0.8
( 
    # Use sustain on carriers for a sound that holds
    (75 1.00 0.01 0.5 0.0 0.2 :sine) # Op1
    (65 1.00 0.01 0.5 0.0 0.2 :sine) # Op2
    (80 1.00 0.01 0.8 0.0 0.3 :sine) # Op3 (Carrier)
    (70 14.0 0.01 0.3 0.0 0.2 :sine) # Op4
    (60 1.00 0.01 0.5 0.0 0.2 :sine) # Op5
    (78 1.00 0.01 0.6 0.0 0.3 :sine) # Op6 (Carrier)
) 5 fm
# The sound has a release phase, so play it for long enough to hear it
0.4 mul 1.0 play`,
            async: {
                duration: 500,
                assert: s => s.length === 0,
                assertDescription: "Stack should be empty after playing."
            }
        },
        {
            replCode: `
150 tempo
# A clock and a sequence of MIDI notes
8 impulse dup (40 40 43 45 43 40 40 35) seq note

# Velocity for each note
0.8

# FM Bass Patch Definition
(
    (80 2.00 0.01 0.05 0.0 0.1 :sine)
    (70 1.00 0.01 0.05 0.0 0.1 :sine)
    (90 1.00 0.01 0.1  0.0 0.1 :sine)
    (60 2.00 0.01 0.05 0.0 0.1 :sine)
    (50 1.00 0.01 0.05 0.0 0.1 :sine)
    (88 0.50 0.01 0.1  0.0 0.1 :sine)
)
15 # Algorithm
fm
0.4 mul start
`,
            async: {
                duration: 50,
                assert: s => s.length === 0,
                assertDescription: "The bassline should start playing."
            }
        },
        {
            replCode: `
120 tempo
# An ambient, evolving pad sound playing a slow arpeggio.
# It uses an impulse clock to trigger notes from a sequence.

# The clock triggers a new note every 2 beats (1 second at 120bpm).
0.5 impulse dup # Create the clock, duplicate it for gate and seq

# The sequence of notes for the arpeggio (C minor 7: C, Eb, G, Bb)
(48 51 55 58) seq note

# A low velocity for a soft, ambient sound
0.3

# The FM patch definition with slow envelopes
(
    (80 1.00 0.8 1.0 1.0 2.0 :sine) # Op1 Carrier
    (82 2.00 1.2 1.0 1.0 2.0 :sine) # Op2 Carrier
    (0 0 0 0 0 0 :sine)            # Op3 Modulator (off)
    (78 0.50 0.9 1.0 1.0 2.5 :sine) # Op4 Carrier
    (80 0.505 1.1 1.0 1.0 2.5 :sine) # Op5 Carrier
    (0 0 0 0 0 0 :sine)            # Op6 Modulator (off)
)
17 # Algorithm with 4 parallel carriers
fm

# Apply master gain and start the sequence. The long release
# times in the patch will cause the notes to overlap and blend.
0.5 mul start
`,
            async: {
                duration: 50,
                assert: s => s.length === 0,
                assertDescription: "The ambient pad sequence should start playing."
            }
        }
    ]
};