

import type { Operator } from '../../types';

const audioOps = new Set(['sine', 'saw', 'pulse', 'noise', 'lpf', 'hpf', 'ad', 'adsr', 'delay', 'distort', 'pan', 'note', 'seq', 'impulse', 'mix', 'mul']);
const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string' && audioOps.has(v[v.length - 1]);

export const mix: Operator = {
    definition: {
        exec: function*(s) {
            const b = s.pop();
            const a = s.pop();

            s.push([a, b, 'mix']);
        },
        description: 'Mixes two audio signals together by creating a combined quotation.',
        effect: '[L_quotationA L_quotationB] -> [L_quotation]'
    },
    examples: [
        { 
            code: "220 sine 330 sine mix 0.5 mul 0.5 play",
            expected: []
        },
        { 
            code: "220 sine 330 sine mix",
            assert: (s) => s.length === 1 && Array.isArray(s[0]) && s[0].length === 3 && s[0][2] === 'mix'
        },
    ]
};