

import type { Operator } from '../../types';

const audioOps = new Set(['sine', 'saw', 'pulse', 'tri', 'noise', 'lpf', 'hpf', 'ad', 'adsr', 'delay', 'distort', 'pan', 'note', 'seq', 'impulse', 'mix', 'mul']);
const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string' && audioOps.has(v[v.length - 1]);

export const sine: Operator = {
    definition: {
        exec: function*(s) {
            const freqOrModulator = s.pop();
            if (isAudioQuotation(freqOrModulator)) {
                // It's an existing audio quotation (e.g., from another operator), so append to it.
                s.push([...freqOrModulator, 'sine']);
            } else {
                // It's a new value (number, list of numbers), so start a new quotation.
                s.push([freqOrModulator, 'sine']);
            }
        },
        description: 'Creates a sine wave oscillator quotation. The frequency can be a number, a list of numbers (for a chord), or an audio quotation for frequency modulation (FM).',
        effect: '[F_freq | [F1 F2...] | L_modulator_quotation] -> [L_quotation]'
    },
    examples: [
        {
            code: '(330 440 445) sine (0.01 0.2 0.0 ahr) mul 0.25 play',
            expected: []
        },
        {
            code: '# Manual FM patch: Carrier Freq = 440, Modulator Freq = 220, Modulation Index = 100\n220 sine 100 mul 440 mix sine 0.5 mul 0.25 play',
            expected: []
        },
        { 
            code: "440 sine",
            assert: (s) => s.length === 1 && Array.isArray(s[0]) && s[0].length === 2 && s[0][0] === 440 && s[0][1] === 'sine'
        },
    ]
};