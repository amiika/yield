import type { Operator } from '../../types';

export const distort: Operator = {
    definition: {
        exec: function*(s) {
            const amount = s.pop();
            const input = s.pop();
            s.push(['distort', input, amount]);
        },
        description: 'Applies distortion to an audio signal node.',
        example: "220 saw 0.8 distort 0.5 mul play",
        effect: '[L_graph F_amount] -> [L_graph]'
    },
    testCases: [
        { code: "220 saw 0.8 distort", expected: [['distort', ['saw', 220], 0.8]] },
    ]
};
