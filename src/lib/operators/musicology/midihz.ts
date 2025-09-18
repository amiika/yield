import type { Operator } from '../../types';
import { midiToFreq } from './defaults';

// Helper to check if a list consists of [value, duration, lyric?] pairs
const isDurationalSequence = (list: any[]): boolean => {
    if (list.length === 0) return true; // Empty list is a valid durational sequence
    const first = list[0];
    return Array.isArray(first) && (first.length === 2 || first.length === 3) && (typeof first[0] === 'number' || first[0] === null) && typeof first[1] === 'number';
};

const processSequence = (sequence: any[]) => {
    return sequence.map(pair => {
        const newPair: any[] = [midiToFreq(pair[0]), pair[1]];
        if (pair.length > 2 && pair[2] !== undefined) {
            newPair.push(pair[2]);
        }
        return newPair;
    });
};

export const midihz: Operator = {
    definition: {
        exec: function*(s) {
            const input = s.pop();
            if (typeof input === 'number') {
                s.push(midiToFreq(input));
            } else if (Array.isArray(input)) {
                // Check for multi-row (matrix) output from `dur`
                const isMultiRow = input.every(isDurationalSequence);
                
                if (isMultiRow) {
                    s.push(input.map(processSequence));
                } else if (isDurationalSequence(input)) {
                    s.push(processSequence(input));
                } else {
                    // Fallback for simple list of MIDI numbers
                    s.push(input.map(val => (typeof val === 'number' && Number.isInteger(val)) ? midiToFreq(val) : val));
                }
            } else {
                s.push(input); // push back
                throw new Error('midihz expects a number, a list of MIDI notes, or a durational sequence from `dur`.');
            }
        },
        description: 'Converts a MIDI note number, a list of MIDI notes, or a durational sequence to frequency in Hertz. For durational sequences `[[note, dur], ...]`, it converts each note to Hz, keeping the duration.',
        effect: '[N_midi | [N1..] | [[N, D1]..]] -> [F_hz | [F1..] | [[F, D1]..]]'
    },
    examples: [
        { code: '69 midihz', expected: [440] },
        { code: '(60 69) midihz', assert: s => Array.isArray(s[0]) && Math.abs(s[0][0] - 261.6255) < 1e-4 && s[0][1] === 440 },
        {
            code: '(60 q 62 e) dur midihz',
            assert: s => {
                const result = s[0];
                if (!Array.isArray(result) || result.length !== 2) return false;
                const [note1, note2] = result;
                return Math.abs(note1[0] - 261.6255) < 1e-4 && note1[1] === 0.25 &&
                       Math.abs(note2[0] - 293.6647) < 1e-4 && note2[1] === 0.125;
            },
            expectedDescription: 'A durational sequence with frequencies: [[261.62, 0.25], [293.66, 0.125]]'
        }
    ]
};
