import type { Operator } from '../../types';

export const pan: Operator = {
    definition: {
        exec: function*(s) {
            const pos = s.pop(); // -1 (L) to 1 (R)
            const input = s.pop();
            s.push(['pan', input, pos]);
        },
        description: 'Pans a mono signal node in the stereo field. -1 is hard left, 1 is hard right.',
        example: "220 sine -0.7 pan play",
        effect: '[L_graph F_pos] -> [L_graph]'
    },
    testCases: [
        { code: "220 sine -0.7 pan", expected: [['pan', ['sine', 220], -0.7]] },
    ]
};
