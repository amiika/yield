
import type { Operator } from '../../types';
import { CHORDS, MODIFIERS, NOTES_TO_INTERVALS } from './defaults';

// Internal helper, adapted from Ziffers
const noteNameToMidi = (name: string): number => {
    const items = name.match(/^([a-gA-G])([#bs])?([0-9])?$/);
    if (items === null) return 60; // Default to C4
    const [, noteName, modifierSymbol, octaveStr] = items;
    const octave = octaveStr ? parseInt(octaveStr, 10) : 4;
    const modifier = MODIFIERS[modifierSymbol] || 0;
    const interval = NOTES_TO_INTERVALS[noteName.toUpperCase()];
    return 12 + octave * 12 + interval + modifier;
};

export const chord: Operator = {
    definition: {
        exec: function*(s) {
            const nameOrSymbol = s.pop();
            let name: string;
            if (typeof nameOrSymbol === 'symbol') {
                const key = Symbol.keyFor(nameOrSymbol);
                if (!key) throw new Error('chord expects a valid symbol.');
                name = key;
            } else if (typeof nameOrSymbol === 'string') {
                name = nameOrSymbol;
            } else {
                throw new Error('chord expects a string or symbol chord name.');
            }
            
            const parsed = name.match(/^([a-gA-G][#bs]?)(.*)/);
            if (!parsed) {
                throw new Error(`Invalid chord name format: '${name}'. Expected format like 'Cmaj7' or 'Dm'.`);
            }

            const [, rootName, quality] = parsed;
            const rootMidi = noteNameToMidi(rootName);
            const qualityKey = (quality || 'major').toLowerCase();
            const intervals = CHORDS[qualityKey];

            if (!intervals) {
                throw new Error(`Unknown chord quality: '${quality}'.`);
            }

            const notes = intervals.map(interval => rootMidi + interval);
            s.push(notes);
        },
        description: 'Parses a chord name and pushes a list of its MIDI notes. The name should be the root note followed by the quality (e.g., "Cmaj7", :Dm, "G7").',
        effect: '[S_chordName|:symbol] -> [L_midiNotes]'
    },
    examples: [
        { code: ':Cmaj7 chord', expected: [[60, 64, 67, 71]] },
        { code: '"Dm" chord', expected: [[62, 65, 69]] },
        { code: ':g7 chord', expected: [[67, 71, 74, 77]] },
        { code: ':F#dim chord', expected: [[66, 69, 72]] },
    ]
};