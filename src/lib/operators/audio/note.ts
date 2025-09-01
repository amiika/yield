import type { Operator } from '../../types';

export const note: Operator = {
    definition: {
        exec: function*(s) {
            const noteVal = s.pop();
            s.push(['note', noteVal]);
        },
        description: 'Creates a node that converts a MIDI note number to a frequency in Hz.',
        effect: '[N_midi] -> [L_graph]'
    },
    examples: [
        { code: "69 note sine play", expected: [['sine', ['note', 69]]] },
        { code: '69 note', expected: [['note', 69]] },
    ]
};