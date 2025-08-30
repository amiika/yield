import type { Operator } from '../../types';

export const sine: Operator = {
    definition: {
        exec: function*(s) {
            const freq = s.pop();
            s.push(['sine', freq]);
        },
        description: 'Creates a sine wave oscillator node.',
        example: "440 sine 0.5 mul play",
        effect: '[F_freq] -> [L_graph]'
    },
    testCases: [
        { code: '440 sine', expected: [['sine', 440]] },
        {
            code: '440 sine 0.5 mul',
            expected: [['mul', ['sine', 440], 0.5]]
        }
    ]
};
