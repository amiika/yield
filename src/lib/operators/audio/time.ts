import type { Operator } from '../../types';

export const time: Operator = {
    definition: {
        exec: function*(s) {
            s.push(['time']);
        },
        description: 'Creates a signal source that outputs the current time in samples, incrementing by 1 for each audio sample. This is the primary input for `bytebeat` and `floatbeat` operators, where its value is accessed using the `t` operator inside a quotation.',
        example: `time [t 255 &] bytebeat`,
        effect: '[] -> [L_graph]'
    },
    testCases: [
        { code: 'time', expected: [['time']] },
    ]
};