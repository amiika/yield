import type { Operator } from '../../types';
import { MODIFIERS, NOTES_TO_INTERVALS } from './defaults';

export const midi: Operator = {
    definition: {
        exec: function*(s) {
            const name = s.pop() as string;
            if (typeof name !== 'string') {
                throw new Error('midi expects a string note name.');
            }

            const items = name.match(/^([a-gA-G])([#bs])?([0-9])?$/);
            if (items === null) {
                s.push(60); // Default to C4 if invalid
                return;
            }

            const [, noteName, modifierSymbol, octaveStr] = items;
            const octave = octaveStr ? parseInt(octaveStr, 10) : 4; // Default to 4th octave
            const modifier = MODIFIERS[modifierSymbol] || 0;
            const interval = NOTES_TO_INTERVALS[noteName.toUpperCase()];
            const midiNote = 12 + octave * 12 + interval + modifier;
            s.push(midiNote);
        },
        description: 'Converts a note name (e.g., "C4", "Fs3") to a MIDI note number.',
        effect: '[S_noteName] -> [N_midi]'
    },
    examples: [
        { code: '"C4" midi', expected: [60] },
        { code: '"A4" midi', expected: [69] },
        { code: '"Fs3" midi', expected: [54] },
        { code: '"Bb2" midi', expected: [46] },
    ]
};