

import type { Operator } from '../../types';

const audioOps = new Set(['sine', 'saw', 'pulse', 'tri', 'noise', 'lpf', 'hpf', 'ad', 'adsr', 'delay', 'distort', 'pan', 'note', 'seq', 'impulse', 'mix', 'mul']);
const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string' && audioOps.has(v[v.length - 1]);

export const pulse: Operator = {
    definition: {
        exec: function*(s) {
            const duty = s.pop();
            const freqOrModulator = s.pop();
            
            if (isAudioQuotation(freqOrModulator)) {
                s.push([...freqOrModulator, duty, 'pulse']);
            } else {
                s.push([freqOrModulator, duty, 'pulse']);
            }
        },
        description: 'Creates a pulse wave oscillator quotation. The frequency can be a number, a list of numbers (for a chord), or an audio quotation for frequency modulation (FM). The duty cycle can also be a number or an audio quotation.',
        effect: '[F_freq|L_freqs|L_modulator F_duty|L_modulator] -> [L_quotation]'
    },
    examples: [
        { 
            code: '(220 330) 0.5 pulse 0.3 mul 0.25 play', 
            expected: []
        },
        { 
            code: '440 0.25 pulse',
            assert: (s) => s.length === 1 && Array.isArray(s[0]) && s[0][0] === 440 && s[0][2] === 'pulse'
        },
    ]
};