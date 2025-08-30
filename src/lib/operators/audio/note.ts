import type { Operator } from '../../types';

export const note: Operator = {
    definition: {
        exec: function*(s) {
            const noteVal = s.pop();
            s.push(['note', noteVal]);
        },
        description: 'Creates a node that converts a MIDI note number to a frequency in Hz.',
        example: "69 note sine play",
        effect: '[N_midi] -> [L_graph]'
    },
    testCases: [
        { code: '69 note', expected: [['note', 69]] },
        {
            code: '69 note sine',
            expected: [['sine', ['note', 69]]]
        }
    ]
};
