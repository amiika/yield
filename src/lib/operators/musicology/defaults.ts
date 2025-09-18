// Adapted from Ziffers library

export const NOTES_TO_INTERVALS: { [key: string]: number } = {
    "C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11,
};

export const MODIFIERS: { [key: string]: number } = {
    "#": 1, "b": -1, "s": 1,
};

export function noteNameToMidi(name: string): number {
    const items = name.match(/^([a-gA-G])([#bs])?(-?[0-9])?$/);
    if (items === null) return 60; // Default to C4 if invalid
    const [, noteName, modifierSymbol, octaveStr] = items;
    const octave = octaveStr ? parseInt(octaveStr, 10) : 4; // Default to 4th octave
    const modifier = MODIFIERS[modifierSymbol] || 0;
    const interval = NOTES_TO_INTERVALS[noteName.toUpperCase()];
    const midiNote = 12 + octave * 12 + interval + modifier;
    return midiNote;
}

// --- Pitch Conversion Utilities ---
export function midiToFreq(midi: number | null): number | null {
    if (midi === null) return null;
    return 440 * Math.pow(2, (midi - 69) / 12);
}

export function freqToMidi(freq: number | null): number | null {
    if (freq === null) return null;
    return 69 + 12 * Math.log2(freq / 440);
}

export function centsToHz(rootHz: number, cents: number | null): number | null {
    if (typeof cents !== 'number') return null; // rests
    return rootHz * Math.pow(2, cents / 1200);
};

export function midiToNoteName(midi: number | null): string {
    if (midi === null) return 'Rest';
    const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const octave = Math.floor(midi / 12) - 1;
    const noteIndex = Math.round(midi) % 12;
    return noteNames[noteIndex] + octave;
}

export function pitchToMidi(pitch: number | null, type: string, tonicMidi: number, prevMidi = 60): number | null {
    if (pitch === null) return null; // Handle rests
    switch (type) {
        case 'midi': return pitch;
        case 'hz': return freqToMidi(pitch);
        case 'cents': return tonicMidi + (pitch / 100);
        case 'pitchClass':
            const tonicPC = tonicMidi % 12;
            const interval = (pitch - tonicPC + 12) % 12;
            const prevOctave = Math.floor(prevMidi / 12);
            let newMidi = prevOctave * 12 + interval;
            // Find the closest octave
            if (Math.abs(newMidi - prevMidi) > 6) {
                newMidi = (newMidi > prevMidi) ? newMidi - 12 : newMidi + 12;
            }
            return newMidi;
        case 'noteName': // This type is for display only, assumes input is already MIDI
        default: return pitch;
    }
}


// From the user-provided 'older' noteseq.ts, which was deemed more correct.
const durationData = [
  { "character": "m..", "fraction": "14/1" }, { "character": "m.", "fraction": "12/1" },
  { "character": "m", "fraction": "8/1" }, { "character": "l..", "fraction": "7/1" },
  { "character": "l.", "fraction": "6/1" }, { "character": "l", "fraction": "4/1" },
  { "character": "d..", "fraction": "7/2" }, { "character": "d.", "fraction": "3/1" },
  { "character": "n", "fraction": "8/3" }, { "character": "d", "fraction": "2/1" },
  { "character": "w..", "fraction": "7/4" }, { "character": "w.", "fraction": "3/2" },
  { "character": "k", "fraction": "4/3" }, { "character": "w", "fraction": "1/1" },
  { "character": "h..", "fraction": "7/8" }, { "character": "h.", "fraction": "3/4" },
  { "character": "c", "fraction": "2/3" }, { "character": "h", "fraction": "1/2" },
  { "character": "q..", "fraction": "7/16" }, { "character": "q.", "fraction": "3/8" },
  { "character": "p", "fraction": "1/3" }, { "character": "q", "fraction": "1/4" },
  { "character": "e..", "fraction": "7/32" }, { "character": "e.", "fraction": "3/16" },
  { "character": "g", "fraction": "1/6" }, { "character": "e", "fraction": "1/8" },
  { "character": "s..", "fraction": "7/64" }, { "character": "s.", "fraction": "3/32" },
  { "character": "a", "fraction": "1/12" }, { "character": "s", "fraction": "1/16" },
  { "character": "t..", "fraction": "7/128" }, { "character": "t.", "fraction": "3/64" },
  { "character": "f", "fraction": "1/24" }, { "character": "t", "fraction": "1/32" },
  { "character": "u..", "fraction": "7/256" }, { "character": "u.", "fraction": "3/128" },
  { "character": "x", "fraction": "1/48" }, { "character": "u", "fraction": "1/64" },
  { "character": "o..", "fraction": "7/512" }, { "character": "o.", "fraction": "3/256" },
  { "character": "y", "fraction": "1/96" }, { "character": "o", "fraction": "1/128" },
  { "character": "j", "fraction": "1/192" }, { "character": "z", "fraction": "0/1" }
];

const parseFraction = (fraction: string): number => {
    const [num, den] = fraction.split('/').map(Number);
    if (den === 0) return 0;
    return num / den;
};

export const DEFAULT_DURS: { [key: string]: number } = {};
durationData.forEach(item => {
    DEFAULT_DURS[item.character] = parseFraction(item.fraction);
});

const MAJOR = [2, 2, 1, 2, 2, 2, 1];
const MINOR = [2, 1, 2, 2, 1, 2, 2];
const HARMONIC_MINOR = [2, 1, 2, 2, 1, 3, 1];
const HARMONIC_MAJOR = [2, 2, 1, 2, 1, 3, 1];
const MINOR_PENTATONIC = [3, 2, 2, 3, 2];
const MAJOR_PENTATONIC = [2, 2, 3, 2, 3];
const BLUES = [3, 2, 1, 1, 3, 2];
const BLUES_MAJOR = [2, 1, 1, 3, 2, 3];
const BLUES_MINOR = [3, 2, 1, 1, 3, 2];
const WHOLE = [2, 2, 2, 2, 2, 2];
const CHROMATIC = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const IONIAN = [2, 2, 1, 2, 2, 2, 1];
const DORIAN = [2, 1, 2, 2, 2, 1, 2];
const PHRYGIAN = [1, 2, 2, 2, 1, 2, 2];
const LYDIAN = [2, 2, 2, 1, 2, 2, 1];
const MIXOLYDIAN = [2, 2, 1, 2, 2, 1, 2];
const AEOLIAN = [2, 1, 2, 2, 1, 2, 2];
const LOCRIAN = [1, 2, 2, 1, 2, 2, 2];

export const SCALES: { [key: string]: number[] } = {
    "MAJOR": MAJOR,
    "MINOR": MINOR,
    "HARMONIC MINOR": HARMONIC_MINOR,
    "HARMONIC MAJOR": HARMONIC_MAJOR,
    "MINOR PENTATONIC": MINOR_PENTATONIC,
    "MAJOR PENTATONIC": MAJOR_PENTATONIC,
    "BLUES": BLUES,
    "BLUES MAJOR": BLUES_MAJOR,
    "BLUES MINOR": BLUES_MINOR,
    "WHOLE": WHOLE,
    "CHROMATIC": CHROMATIC,
    "IONIAN": IONIAN,
    "DORIAN": DORIAN,
    "PHRYGIAN": PHRYGIAN,
    "LYDIAN": LYDIAN,
    "MIXOLYDIAN": MIXOLYDIAN,
    "AEOLIAN": AEOLIAN,
    "LOCRIAN": LOCRIAN,

    // Shorthands
    "MAJ": MAJOR,
    "MIN": MINOR,
    "HMIN": HARMONIC_MINOR,
    "HMAJ": HARMONIC_MAJOR,
    "PMIN": MINOR_PENTATONIC,
    "PMAJ": MAJOR_PENTATONIC,
    "BMIN": BLUES_MINOR,
    "BMAJ": BLUES_MAJOR,
    "WHO": WHOLE,
    "CHRO": CHROMATIC,
    "ION": IONIAN,
    "DOR": DORIAN,
    "PHRY": PHRYGIAN,
    "LYD": LYDIAN,
    "MIX": MIXOLYDIAN,
    "AEOL": AEOLIAN,
    "LOC": LOCRIAN,
};

// Helper to convert intervals (in semitones) to cents from tonic
const intervalsToCents = (intervals: number[]): number[] => {
    const cents = [0];
    let cumulative = 0;
    for (let i = 0; i < intervals.length - 1; i++) {
        cumulative += intervals[i] * 100;
        cents.push(cumulative);
    }
    return cents;
};

// Cents-based scales for the plotter
export const SCALES_IN_CENTS: { [key: string]: number[] } = {};
for (const key in SCALES) {
    SCALES_IN_CENTS[key] = intervalsToCents(SCALES[key]);
}

// Add special microtonal scales directly in cents
SCALES_IN_CENTS['NAHAWAND'] = [0, 200, 350, 500, 700, 800, 1050];


export const CHORDS: { [key: string]: number[] } = {
    "1": [0],
    "5": [0, 7],
    "+5": [0, 4, 8],
    "m+5": [0, 3, 8],
    "sus2": [0, 2, 7],
    "sus4": [0, 5, 7],
    "6": [0, 4, 7, 9],
    "m6": [0, 3, 7, 9],
    "7sus2": [0, 2, 7, 10],
    "7sus4": [0, 5, 7, 10],
    "7-5": [0, 4, 6, 10],
    "7+5": [0, 4, 8, 10],
    "m7+5": [0, 3, 8, 10],
    "9": [0, 4, 7, 10, 14],
    "m9": [0, 3, 7, 10, 14],
    "maj9": [0, 4, 7, 11, 14],
    "9sus4": [0, 5, 7, 10, 14],
    "11": [0, 4, 7, 10, 14, 17],
    "m11": [0, 3, 7, 10, 14, 17],
    "maj11": [0, 4, 7, 11, 14, 17],
    "13": [0, 4, 7, 10, 14, 17, 21],
    "m13": [0, 3, 7, 10, 14, 17, 21],
    "add2": [0, 2, 4, 7],
    "add4": [0, 4, 5, 7],
    "add9": [0, 4, 7, 14],
    "madd9": [0, 3, 7, 14],
    "dim": [0, 3, 6],
    "dim7": [0, 3, 6, 9],
    "hdim7": [0, 3, 6, 10],
    "aug": [0, 4, 8],
    "major": [0, 4, 7],
    "maj": [0, 4, 7],
    "M": [0, 4, 7],
    "minor": [0, 3, 7],
    "min": [0, 3, 7],
    "m": [0, 3, 7],
    "major7": [0, 4, 7, 11],
    "maj7": [0, 4, 7, 11],
    "M7": [0, 4, 7, 11],
    "dom7": [0, 4, 7, 10],
    "7": [0, 4, 7, 10],
    "minor7": [0, 3, 7, 10],
    "min7": [0, 3, 7, 10],
    "m7": [0, 3, 7, 10],
    "m7b5": [0, 3, 6, 10],
};

const KEY_SIGNATURES: Record<string, any> = {
    'C': { type: 'sharp', count: 0 }, 'G': { type: 'sharp', count: 1 }, 'D': { type: 'sharp', count: 2 },
    'A': { type: 'sharp', count: 3 }, 'E': { type: 'sharp', count: 4 }, 'B': { type: 'sharp', count: 5 },
    'F#': { type: 'sharp', count: 6 }, 'C#': { type: 'sharp', count: 7 },
    'F': { type: 'flat', count: 1 }, 'Bb': { type: 'flat', count: 2 }, 'Eb': { type: 'flat', count: 3 },
    'Ab': { type: 'flat', count: 4 }, 'Db': { type: 'flat', count: 5 }, 'Gb': { type: 'flat', count: 6 },
    'Cb': { type: 'flat', count: 7 },
    'Am': { type: 'sharp', count: 0 }, 'Em': { type: 'sharp', count: 1 }, 'Bm': { type: 'sharp', count: 2 },
    'F#m': { type: 'sharp', count: 3 }, 'C#m': { type: 'sharp', count: 4 }, 'G#m': { type: 'sharp', count: 5 },
    'D#m': { type: 'sharp', count: 6 }, 'A#m': { type: 'sharp', count: 7 },
    'Dm': { type: 'flat', count: 1 }, 'Gm': { type: 'flat', count: 2 }, 'Cm': { type: 'flat', count: 3 },
    'Fm': { type: 'flat', count: 4 }, 'Bbm': { type: 'flat', count: 5 }, 'Ebm': { type: 'flat', count: 6 },
};

function parseKeyString(keyStr: string): { tonic: number, keySignature: string, scaleType: 'major' | 'minor' } {
    const parsed = keyStr.match(/^([A-G][#b]?)(m)?/i);
    if (!parsed) {
        throw new Error(`Invalid key string format: ${keyStr}`);
    }
    
    const [, rootName, minorMarker] = parsed;
    const isMinor = !!minorMarker;
    
    const formattedRoot = rootName.charAt(0).toUpperCase() + rootName.slice(1).toLowerCase();
    const keySignature = formattedRoot + (isMinor ? 'm' : '');
    
    if (!KEY_SIGNATURES[keySignature]) {
        throw new Error(`Unsupported key signature: ${keySignature}`);
    }
    
    const tonicMidi = noteNameToMidi(formattedRoot + '4');
    
    return {
        tonic: tonicMidi,
        keySignature: keySignature,
        scaleType: isMinor ? 'minor' : 'major'
    };
}

const MIDI_PC_TO_KEY: { [key: number]: string } = {
    0: 'C', 1: 'Db', 2: 'D', 3: 'Eb', 4: 'E', 5: 'F', 6: 'F#', 7: 'G', 8: 'Ab', 9: 'A', 10: 'Bb', 11: 'B'
};

export function resolveKeyInfo(keyValue: any): { tonic: number, keySignature: string, scaleType: 'major' | 'minor' } {
    if (typeof keyValue === 'number') {
        const tonic = keyValue;
        const pc = Math.round(tonic) % 12;
        return {
            tonic: tonic,
            keySignature: MIDI_PC_TO_KEY[pc] || 'C',
            scaleType: 'major'
        };
    }

    let keyStr: string | undefined;
    if (typeof keyValue === 'string') {
        keyStr = keyValue;
    } else if (typeof keyValue === 'symbol') {
        keyStr = Symbol.keyFor(keyValue);
    }
    
    if (keyStr) {
        return parseKeyString(keyStr);
    }

    return { tonic: 60, keySignature: 'C', scaleType: 'major' };
}