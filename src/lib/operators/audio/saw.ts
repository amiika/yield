import type { Operator } from '../../types';

export const saw: Operator = {
    definition: {
        exec: function*(s) {
            const freq = s.pop();
            s.push(['saw', freq]);
        },
        description: 'Creates a sawtooth wave oscillator node.',
        example: "440 saw 0.5 mul play",
        effect: '[F_freq] -> [L_graph]'
    },
    testCases: [
        { code: '440 saw', expected: [['saw', 440]] },
        {
            code: '440 saw 0.5 mul',
            expected: [['mul', ['saw', 440], 0.5]]
        }
    ]
};
