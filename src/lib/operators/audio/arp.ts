

import type { Operator } from '../../types';

const audioOps = new Set(['sine', 'saw', 'pulse', 'tri', 'noise', 'lpf', 'hpf', 'ad', 'adsr', 'ahr', 'delay', 'distort', 'pan', 'note', 'seq', 'impulse', 'mix', 'mul', 'bd', 'sd', 'hh', 'lt', 'mt', 'ht', 'gate', 'oneshot', 'fm_synth', 'fm_simple', 'arp', 'floatbeat', 'bytebeat']);
const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string' && audioOps.has(v[v.length - 1]);


export const arp: Operator = {
    definition: {
        exec: function*(s) {
            const speed = s.pop(); // can be number or audio quotation
            const y_semitones = s.pop();
            const x_semitones = s.pop();
            const base_note = s.pop();

            // Validation
            const isSpeedValid = (typeof speed === 'number' && speed > 0) || isAudioQuotation(speed);
            if (!isSpeedValid) {
                s.push(base_note, x_semitones, y_semitones, speed); // push back
                throw new Error('arp expects a positive number or an audio quotation (e.g. from floatbeat) for speed (in Hz).');
            }
            if (typeof y_semitones !== 'number' || typeof x_semitones !== 'number') {
                s.push(base_note, x_semitones, y_semitones, speed); // push back
                throw new Error('arp expects numbers for semitone offsets.');
            }
            
            const base_freq_quotation = isAudioQuotation(base_note) ? base_note : [base_note, 'note'];
            
            const freq_multiplier_x = Math.pow(2, x_semitones / 12);
            const freq_multiplier_y = Math.pow(2, y_semitones / 12);

            const clock_quotation = [speed, 'impulse'];
            
            s.push([clock_quotation, base_freq_quotation, freq_multiplier_x, freq_multiplier_y, 'arp']);
        },
        description: 'Creates a fast arpeggiated frequency stream quotation, simulating a classic chiptune chord. It sequences three notes at a specified speed (in Hz): a base note, and two notes offset by X and Y semitones. The speed can be a number or an audio quotation (e.g. from `floatbeat`) for dynamic control. The resulting quotation is a frequency modulator that can be piped into any oscillator.',
        effect: '[base_note_or_quotation x_semitones y_semitones speed_hz_or_quotation] -> [L_frequency_stream_quotation]'
    },
    examples: [
        {
            replCode: `62 3 7 60 arp 0.25 pulse 0.3 mul 1.0 play`,
            async: {
                duration: 20,
                assert: s => s.length === 0,
                assertDescription: "A classic D-minor pulse-wave arpeggio should play for 1 beat."
            }
        },
        {
            replCode: `60 1 0 240 arp saw 0.3 mul 1.0 play`,
            async: {
                duration: 20,
                assert: s => s.length === 0,
                assertDescription: "A very fast C/C# trill effect should play for 1 beat."
            }
        },
        {
            replCode: `90 4 7 50 arp sine 0.4 mul 1.0 play`,
            async: {
                duration: 20,
                assert: s => s.length === 0,
                assertDescription: "A phone ring like arp effect should play for 1 beat."
            }
        },
        {
            replCode: `
120 tempo
# A sequence of notes
4 impulse (60 62 64 67) seq

# Arpeggiate each note with a speed modulated by an LFO.
# The floatbeat quotation generates a signal oscillating between 20 and 100.
4 7 (t 20 * sin 40 * 60 +) 1 floatbeat arp

# Pipe the arpeggiated frequency stream into a saw wave
saw

# Apply gain and start the sequence
0.3 mul start`,
            async: {
                duration: 50,
                assert: s => s.length === 0,
                assertDescription: "An arpeggiated melody with modulated speed should start playing."
            }
        },
        {
            replCode: `
# Define a reusable arpeggio sound with '=>'
# This creates a function 'arpf' that takes a base note
# and creates a minor arpeggiated pulse-wave sound quotation.
(3 7 80 arp 0.25 pulse) arpf =>

# Use the new function to play a C note (60)
60 arpf 0.4 mul 1 play`,
            async: {
                duration: 200,
                assert: (s, dict) => s.length === 0 && dict['arpf'] !== undefined,
                assertDescription: "A reusable arpeggio function 'arpf' is created and used to play a note."
            }
        },
        {
            replCode: `
# Define a reusable arpeggio sound with '=>'
(3 7 80 arp 0.25 pulse) arpf =>

# A sequence of notes for a C-major scale
(60 62 64 65 67 69 71 72)

# Play each note in the sequence, waiting 0.25 beats between each one
(
  arpf      # apply the arpeggio function to the note
  0.4 mul   # apply gain
  0.25 play # play for 0.25 beats
  0.25 sleep # wait 0.25 beats before the next note
) step`,
            async: {
                duration: 50,
                assert: (s, dict) => s.length === 0 && dict['arpf'] !== undefined,
                assertDescription: "The arpeggiated scale should play completely, leaving the stack empty."
            }
        }
    ]
};