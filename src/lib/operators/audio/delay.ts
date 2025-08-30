import type { Operator } from '../../types';

export const delay: Operator = {
    definition: {
        exec: function*(s) {
            const feedback = s.pop();
            const time = s.pop();
            const input = s.pop();
            s.push(['delay', input, time, feedback]);
        },
        description: 'Applies a delay effect with feedback to an audio signal node.',
        example: "220 sine dup 0.25 0.5 delay mix 0.5 mul play",
        effect: '[L_graph F_time F_feedback] -> [L_graph]'
    },
    testCases: [
        { code: "220 sine 0.25 0.5 delay", expected: [['delay', ['sine', 220], 0.25, 0.5]] },
    ]
};
