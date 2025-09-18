import type { Operator } from '../../types';

export const pc: Operator = {
    definition: {
        exec: function*(s) {
            const scale = s.pop();
            const pitchClass = s.pop() as number;
            const root = s.pop() as number;

            if (typeof root !== 'number' || typeof pitchClass !== 'number' || !Array.isArray(scale)) {
                throw new Error('pc expects: root (number), pitchClass (number), scale (list of intervals).');
            }

            const scaleLength = scale.length;
            let pcIndex = pitchClass;
            let pitchOctave = 0;

            if (pcIndex >= scaleLength || pcIndex < 0) {
                pitchOctave += Math.floor(pcIndex / scaleLength);
                pcIndex = pcIndex % scaleLength;
                if (pcIndex < 0) {
                    pcIndex += scaleLength;
                }
            }
            
            const intervals = scale as number[];
            const octaveSpan = intervals.reduce((a, b) => a + b, 0);

            const intervalSum = intervals.slice(0, pcIndex).reduce((a, b) => a + b, 0);

            const note = root + intervalSum + (pitchOctave * octaveSpan);
            s.push(note);
        },
        description: 'Resolves a pitch class (PC) to a MIDI note within a given scale and root. The PC is a zero-based index into the scale. PCs outside the scale length wrap around and transpose by octaves.',
        effect: '[N_root N_pitchClass L_scale] -> [N_midiNote]'
    },
    examples: [
        // Basic examples in C major
        { code: '60 0 "major" scale pc', expected: [60] }, // C4
        { code: '60 1 "major" scale pc', expected: [62] }, // D4
        { code: '60 2 "major" scale pc', expected: [64] }, // E4
        { code: '60 6 "major" scale pc', expected: [71] }, // B4
        // Octave wrapping
        { code: '60 7 "major" scale pc', expected: [72] }, // C5
        { code: '60 8 "major" scale pc', expected: [74] }, // D5
        { code: '60 -1 "major" scale pc', expected: [59] }, // B3
    ]
};