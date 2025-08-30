import type { Operator } from '../../types';

export const seq: Operator = {
    definition: {
        exec: function*(s) {
            const list = s.pop();
            const clock = s.pop();
            if (!Array.isArray(list)) {
                throw new Error('seq expects a list of values.');
            }
            s.push(['seq', clock, ...list]);
        },
        description: 'Creates a step sequencer node. Steps through the list of values on each tick of the clock signal.',
        example: "4 impulse [60 64 67 72] seq note sine play",
        effect: '[L_clock L_values] -> [L_graph]'
    },
    testCases: [
        { code: "4 impulse [60 64 67] seq", expected: [['seq', ['impulse', 4], 60, 64, 67]] },
        {
            code: '4 impulse [60 64 67 72] seq note sine',
            expected: [['sine', ['note', ['seq', ['impulse', 4], 60, 64, 67, 72]]]]
        }
    ]
};
