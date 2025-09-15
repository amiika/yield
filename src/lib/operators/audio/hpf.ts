

import type { Operator } from '../../types';

const audioOps = new Set(['sine', 'saw', 'pulse', 'noise', 'lpf', 'hpf', 'ad', 'adsr', 'delay', 'distort', 'pan', 'note', 'seq', 'impulse', 'mix', 'mul']);
const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string' && audioOps.has(v[v.length - 1]);

export const hpf: Operator = {
    definition: {
        exec: function*(s) {
            const resonance = s.pop();
            const cutoff = s.pop();
            const input = s.pop();
            const inputOperand = isAudioQuotation(input) ? input : input;
            s.push([inputOperand, cutoff, resonance, 'hpf']);
        },
        description: 'Applies a high-pass filter to an audio signal quotation.',
        effect: '[L_quotation F_cutoff F_resonance] -> [L_quotation]'
    },
    examples: [
        { 
            code: "noise 2000 0.2 hpf 0.5 mul 0.5 play",
            expected: []
        },
        { 
            code: "noise 2000 0.2 hpf",
            assert: (s) => s.length === 1 && Array.isArray(s[0]) && s[0].length === 4
        },
    ]
};
