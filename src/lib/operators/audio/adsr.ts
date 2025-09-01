import type { Operator } from '../../types';

export const adsr: Operator = {
    definition: {
        exec: function*(s) {
            const release = s.pop();
            const sustain = s.pop();
            const decay = s.pop();
            const attack = s.pop();
            const gate = s.pop();
            s.push(['adsr', gate, attack, decay, sustain, release]);
        },
        description: 'Creates an Attack-Decay-Sustain-Release (ADSR) envelope node.',
        effect: '[S_gate F_a F_d F_s F_r] -> [L_graph]'
    },
    examples: [
        { code: "440 sine 1 0.1 0.2 0.5 0.3 adsr mul play", expected: [['mul', ['sine', 440], ['adsr', 1, 0.1, 0.2, 0.5, 0.3]]] },
        { code: '1 0.1 0.2 0.5 0.3 adsr', expected: [['adsr', 1, 0.1, 0.2, 0.5, 0.3]] },
    ]
};