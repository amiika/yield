

import type { Operator } from '../../types';

const audioOps = new Set(['sine', 'saw', 'pulse', 'noise', 'lpf', 'hpf', 'ad', 'adsr', 'delay', 'distort', 'pan', 'note', 'seq', 'impulse', 'mix', 'mul']);
const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string' && audioOps.has(v[v.length - 1]);

export const pan: Operator = {
    definition: {
        exec: function*(s) {
            const pos = s.pop(); // -1 (L) to 1 (R)
            const input = s.pop();
            const inputOperand = isAudioQuotation(input) ? input : input;
            s.push([inputOperand, pos, 'pan']);
        },
        description: 'Pans a mono signal quotation in the stereo field. -1 is hard left, 1 is hard right.',
        effect: '[L_quotation F_pos] -> [L_quotation]'
    },
    examples: [
        { 
            code: "220 sine -0.7 pan 0.5 mul 0.5 play",
            expected: []
        },
        { 
            code: "220 sine -0.7 pan",
            assert: (s) => s.length === 1 && Array.isArray(s[0]) && s[0].length === 3
        },
    ]
};
