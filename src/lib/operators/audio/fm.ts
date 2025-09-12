


import type { Operator } from '../../types';

const isAudioGraph = (v: any): boolean => Array.isArray(v) && typeof v[0] === 'string';

// The main, user-facing 'fm' operator.
export const fm: Operator = {
    definition: {
        exec: function*(s) {
            const top = s.length > 0 ? s[s.length - 1] : undefined;
            const second = s.length > 1 ? s[s.length - 2] : undefined;

            // Complex DX7 mode detection: [gate] [baseFreq] [op_defs] [algo_id] fm
            if (typeof top === 'number' && Array.isArray(second)) {
                const algorithmId = s.pop() as number;
                const opDefs = s.pop() as any[][];
                const baseFreq = s.pop();
                const gate = s.pop();

                if (!Array.isArray(opDefs) || opDefs.length !== 6) {
                    throw new Error(`fm (complex) expects 6 operator definitions.`);
                }
                s.push(['fm_synth', gate, baseFreq, opDefs, algorithmId]);
                return;
            }

            // Simple 2-operator FM mode: [carrier_freq] [mod_freq] [mod_index] [:carrier] [:mod] fm
            const mod_wave_sym = s.pop();
            const carrier_wave_sym = s.pop();
            const mod_index = s.pop();
            const mod_freq = s.pop();
            const carrier_freq = s.pop();

            if (
                typeof mod_wave_sym !== 'symbol' ||
                typeof carrier_wave_sym !== 'symbol' ||
                typeof mod_index !== 'number' ||
                typeof mod_freq !== 'number' ||
                (typeof carrier_freq !== 'number' && !isAudioGraph(carrier_freq))
            ) {
                // Restore stack before throwing
                s.push(carrier_freq, mod_freq, mod_index, carrier_wave_sym, mod_wave_sym); 
                throw new Error('Simple fm expects [carrier_freq(num|graph) mod_freq(num) mod_index(num) :carrier_wave(sym) :mod_wave(sym)]');
            }

            const mod_wave = Symbol.keyFor(mod_wave_sym);
            const carrier_wave = Symbol.keyFor(carrier_wave_sym);

            if (!mod_wave || !carrier_wave) {
                throw new Error(`fm (simple): Invalid waveform symbols.`);
            }
            
            s.push(['fm_simple', carrier_freq, mod_freq, mod_index, carrier_wave, mod_wave]);
        },
        description: `A versatile FM synthesis operator that directly creates an audio graph node.
- **Simple Mode**: \`carrier_freq mod_freq mod_index :carrier_wave :mod_wave fm -> graph\`. Creates a simple 2-operator FM graph.
- **Complex Mode**: \`gate baseFreq [op_defs] algo_id fm -> graph\`. Creates a 6-operator DX7-style FM graph.`,
        effect: `[...] -> [L_graph]`
    },
    examples: [
        {
            code: [
                '# A patch that takes a carrier frequency and applies FM.',
                '(220 400 :sine :sine fm) :bell =',
                '# Play the patch at 440 Hz.',
                '440 :bell play',
            ],
            assert: (s) => {
                const graph = s[0];
                return s.length === 1 &&
                    graph[0] === 'fm_simple' &&
                    graph[1] === 440; // The carrier frequency was correctly applied
            },
            expectedDescription: 'An FM audio graph with a frequency as its carrier.'
        },
        {
            code: [
`# Define a percussive E-Piano patch quotation.
# This patch expects a [gate, freq_graph] on the stack from 'play'.
(
  ( # opDefs
    (99 1.00 0.01 0.2 0.0 0.1) # Op1
    (75 1.00 0.01 0.2 0.0 0.1) # Op2
    (90 1.00 0.01 0.8 0.0 0.2) # Op3 (Carrier)
    (85 14.0 0.01 0.2 0.0 0.1) # Op4
    (70 1.00 0.01 0.2 0.0 0.1) # Op5
    (88 1.00 0.01 0.5 0.0 0.2) # Op6 (Carrier)
  )
  5 fm
) :epiano =

# Play a C4 note using the patch.
60 note :epiano play`
            ],
            assert: (s) => s.length === 1 && isAudioGraph(s[0]) && s[0][0] === 'fm_synth',
            expectedDescription: 'A single audio graph for one E-Piano note.'
        }
    ]
};