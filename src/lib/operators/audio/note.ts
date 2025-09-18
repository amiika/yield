import type { Operator } from '../../types';
import { midiToFreq } from '../../operators/musicology/defaults';

// Helper to identify audio quotations. This is a broad check for operators that return quotations.
const audioOps = new Set(['sine', 'saw', 'pulse', 'noise', 'lpf', 'hpf', 'ad', 'adsr', 'delay', 'distort', 'pan', 'note', 'seq', 'impulse', 'mix', 'mul', 'tri', 'bd', 'sd', 'hh', 'lt', 'mt', 'ht', 'fm_simple', 'fm_synth']);
const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string' && audioOps.has(v[v.length - 1]);

export const note: Operator = {
    definition: {
        exec: function*(s) {
            const input = s.pop();
            
            if (typeof input === 'symbol') {
                // Input is a symbol (e.g., :freq). Create a quotation for in-graph conversion.
                s.push([input, 'note']);
            } else if (isAudioQuotation(input)) {
                // Input is a modulator signal (an audio quotation).
                // Create a new quotation for in-graph conversion.
                s.push([...input, 'note']);

            } else if (Array.isArray(input)) {
                // Input is a list of static MIDI numbers.
                // Immediately convert them all to frequencies.
                s.push(input.map(val => typeof val === 'number' ? midiToFreq(val) : val));

            } else if (typeof input === 'number') {
                // Input is a single static MIDI number.
                // Immediately convert it to a frequency.
                s.push(midiToFreq(input));
            } else {
                // Invalid input, push back and throw error.
                s.push(input);
                throw new Error('note operator expects a number, a list of numbers, a symbol, or an audio quotation.');
            }
        },
        description: 'Converts a MIDI note number to its frequency in Hertz. If the input is a number or a list of numbers, it performs the conversion immediately. If the input is an audio quotation (e.g., a modulator like an LFO) or a symbol (for patch definitions), it creates a new audio quotation to perform the conversion within the audio graph.',
        effect: '[N_midi | [N1..] | S_symbol | L_modulator] -> [F_hz | [F1..] | L_quotation]'
    },
    examples: [
        {
            code: '# A simple vibrato effect. An LFO (2Hz sine wave) modulates the MIDI note around 60.\n2 sine 5 * 60 + note sine 0.4 mul start',
            expected: []
        },
        {
            // This demonstrates converting a stream of MIDI notes from a sequencer into a frequency signal
            code: '8 impulse (60 62 64 65) seq note sine 0.5 mul start',
            expected: []
        },
        {
            code: "69 note",
            expected: [440]
        },
        { 
            code: '(60 64 67) note',
            assert: s => s.length === 1 && Array.isArray(s[0]) && Math.abs(s[0][0] - 261.6255) < 1e-4,
            expectedDescription: "A list of frequencies: (261.62... 329.62... 391.99...)"
        },
    ]
};
