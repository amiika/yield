

import type { Operator } from '../../types';

const audioOps = new Set(['sine', 'saw', 'pulse', 'noise', 'lpf', 'hpf', 'ad', 'adsr', 'delay', 'distort', 'pan', 'note', 'seq', 'impulse', 'mix', 'mul']);
const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string' && audioOps.has(v[v.length - 1]);

export const ad: Operator = {
    definition: {
        exec: function*(s) {
            const decay = s.pop();
            const attack = s.pop();
            const gate = s.pop();
            const gateOperand = isAudioQuotation(gate) ? gate : gate;
            s.push([gateOperand, attack, decay, 'ad']);
        },
        description: 'Creates an Attack-Decay envelope generator quotation.',
        effect: '[S_gate F_attack F_decay] -> [L_quotation]'
    },
    examples: [
        { 
            code: '1 0.1 0.2 ad 0.4 play', 
            expected: [] 
        },
        { 
            code: "1 0.01 0.4 ad",
            assert: (s) => s.length === 1 && Array.isArray(s[0]) && s[0].length === 4
        },
    ]
};
