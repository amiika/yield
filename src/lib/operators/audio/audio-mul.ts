import type { Operator } from '../../types';

export const mul: Operator = {
    definition: {
        exec: function*(s) {
            const b = s.pop();
            const a = s.pop();
            s.push(['mul', a, b]);
        },
        description: 'Multiplies two audio signals (or a signal and a number for gain).',
        effect: '[L_graphA L_graphB_or_F] -> [L_graph]'
    },
    examples: [
        { code: "440 sine 0.5 mul play", expected: [['mul', ['sine', 440], 0.5]] },
    ]
};