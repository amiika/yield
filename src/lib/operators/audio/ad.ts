import type { Operator } from '../../types';

export const ad: Operator = {
    definition: {
        exec: function*(s) {
            const decay = s.pop();
            const attack = s.pop();
            const gate = s.pop();
            s.push(['ad', gate, attack, decay]);
        },
        description: 'Creates an Attack-Decay envelope generator node.',
        effect: '[S_gate F_attack F_decay] -> [L_graph]'
    },
    // FIX: Renamed 'testCases' to 'examples' to match the Operator type.
    examples: [
        { code: "440 sine 1 0.01 0.4 ad mul play", expected: [['mul', ['sine', 440], ['ad', 1, 0.01, 0.4]]] },
        { code: '1 0.1 0.2 ad', expected: [['ad', 1, 0.1, 0.2]] },
    ]
};