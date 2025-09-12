import type { Operator } from '../../types';

export const note: Operator = {
    definition: {
        exec: function*(s) {
            const noteInput = s.pop();
            if (Array.isArray(noteInput) && noteInput.every(item => typeof item === 'number')) {
                // It's a list of MIDI numbers for a chord.
                const noteGraphs = noteInput.map(n => ['note', n]);
                s.push(noteGraphs);
            } else {
                // It's a single value (number or modulator graph for pitch)
                s.push(['note', noteInput]);
            }
        },
        description: 'Creates a node that converts a MIDI note number to a frequency in Hz. If given a list of numbers, it creates a list of note nodes.',
        effect: '[N_midi | [N1 N2 ...]] -> [L_graph | [L_graph1 L_graph2 ...]]'
    },
    examples: [
        { code: "69 note sine play", expected: [['sine', ['note', 69]]] },
        { code: '69 note', expected: [['note', 69]] },
        { 
            code: '(60 64 67) note',
            expected: [[['note', 60], ['note', 64], ['note', 67]]]
        }
    ]
};