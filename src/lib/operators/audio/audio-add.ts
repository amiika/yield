import type { Operator } from '../../types';

export const mix: Operator = {
    definition: {
        exec: function*(s) {
            const b = s.pop();
            const a = s.pop();
            s.push(['mix', a, b]);
        },
        description: 'Mixes two audio signal nodes together by adding them.',
        example: "220 sine 330 sine mix 0.5 mul play",
        effect: '[L_graphA L_graphB] -> [L_graph]'
    },
    testCases: [
        { code: "220 sine 330 sine mix", expected: [['mix', ['sine', 220], ['sine', 330]]] },
    ]
};
