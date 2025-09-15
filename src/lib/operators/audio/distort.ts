

import type { Operator } from '../../types';

const audioOps = new Set(['sine', 'saw', 'pulse', 'noise', 'lpf', 'hpf', 'ad', 'adsr', 'delay', 'distort', 'pan', 'note', 'seq', 'impulse', 'mix', 'mul']);
const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string' && audioOps.has(v[v.length - 1]);

export const distort: Operator = {
    definition: {
        exec: function*(s) {
            const amount = s.pop();
            const input = s.pop();
            const inputOperand = isAudioQuotation(input) ? input : input;
            s.push([inputOperand, amount, 'distort']);
        },
        description: 'Applies distortion to an audio signal quotation.',
        effect: '[L_quotation F_amount] -> [L_quotation]'
    },
    examples: [
        { 
            code: "220 saw 0.8 distort 0.5 mul 0.5 play",
            expected: []
        },
        { 
            code: "220 saw 0.8 distort",
            assert: (s) => s.length === 1 && Array.isArray(s[0]) && s[0].length === 3
        },
    ]
};
