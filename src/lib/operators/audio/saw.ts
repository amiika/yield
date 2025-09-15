

import type { Operator } from '../../types';

const audioOps = new Set(['sine', 'saw', 'pulse', 'tri', 'noise', 'lpf', 'hpf', 'ad', 'adsr', 'delay', 'distort', 'pan', 'note', 'seq', 'impulse', 'mix', 'mul']);
const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string' && audioOps.has(v[v.length - 1]);

export const saw: Operator = {
    definition: {
        exec: function*(s) {
            const freqOrModulator = s.pop();
            if (isAudioQuotation(freqOrModulator)) {
                s.push([...freqOrModulator, 'saw']);
            } else {
                s.push([freqOrModulator, 'saw']);
            }
        },
        description: 'Creates a sawtooth wave oscillator quotation. The frequency can be a number, a list of numbers (for a chord), or an audio quotation for frequency modulation (FM).',
        effect: '[F_freq | [F1 F2...] | L_modulator_quotation] -> [L_quotation]'
    },
    examples: [
        { 
            code: '(330 440) saw (0.01 0.2 0.0 ahr) mul 0.25 play', 
            expected: []
        },
        { 
            code: '440 saw',
            assert: (s) => s.length === 1 && Array.isArray(s[0]) && s[0][0] === 440 && s[0][1] === 'saw'
        },
    ]
};