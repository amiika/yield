

import type { Operator } from '../../types';

const audioOps = new Set(['sine', 'saw', 'pulse', 'noise', 'lpf', 'hpf', 'ad', 'adsr', 'delay', 'distort', 'pan', 'note', 'seq', 'impulse', 'mix', 'mul']);
const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string' && audioOps.has(v[v.length - 1]);

export const delay: Operator = {
    definition: {
        exec: function*(s) {
            const feedback = s.pop();
            const time = s.pop();
            const input = s.pop();
            const inputOperand = isAudioQuotation(input) ? input : input;
            s.push([inputOperand, time, feedback, 'delay']);
        },
        description: 'Applies a delay effect with feedback to an audio signal quotation.',
        effect: '[L_quotation F_time F_feedback] -> [L_quotation]'
    },
    examples: [
        { 
            code: "220 sine 0.25 0.5 delay 0.5 mul 0.5 play",
            expected: []
        },
        { 
            code: "220 sine 0.25 0.5 delay",
            assert: (s) => s.length === 1 && Array.isArray(s[0]) && s[0].length === 4
        },
    ]
};
