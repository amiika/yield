import type { Operator } from '../../types';
import { midiToFreq } from './defaults';

// Helper to check if a list consists of [value, duration, lyric?] pairs
const isDurationalSequence = (list: any[]): boolean => {
    if (list.length === 0) return true;
    const first = list[0];
    return Array.isArray(first) && (first.length === 2 || first.length === 3) && (typeof first[0] === 'number' || first[0] === null) && typeof first[1] === 'number';
};

// pc logic
const resolvePc = (root: number, pitchClass: number | null, scale: number[]): number | null => {
    if (typeof pitchClass !== 'number') return null; // for rests
    const scaleLength = scale.length;
    let pcIndex = pitchClass;
    let pitchOctave = 0;

    if (pcIndex >= scaleLength || pcIndex < 0) {
        pitchOctave += Math.floor(pcIndex / scaleLength);
        pcIndex %= scaleLength;
        if (pcIndex < 0) {
            pcIndex += scaleLength;
        }
    }
    
    const intervals = scale;
    const octaveSpan = intervals.reduce((a, b) => a + b, 0);
    const intervalSum = intervals.slice(0, pcIndex).reduce((a, b) => a + b, 0);
    return root + intervalSum + (pitchOctave * octaveSpan);
};

const processSequence = (sequence: any[], root: number, scale: number[]) => {
    return sequence.map(pair => {
        const pc = pair[0];
        const duration = pair[1];
        const lyric = pair[2];
        const note = resolvePc(root, pc, scale);
        const newPair: any[] = [midiToFreq(note), duration];
        if (lyric !== undefined) {
            newPair.push(lyric);
        }
        return newPair;
    });
};

export const pchz: Operator = {
    definition: {
        exec: function*(s) {
            const scale = s.pop();
            const pitchOrSeq = s.pop();
            const root = s.pop() as number;

            if (typeof root !== 'number' || !Array.isArray(scale)) {
                s.push(root, pitchOrSeq, scale); // restore
                throw new Error('pchz expects: root (number), pitchClass/sequence, scale (list of intervals).');
            }

            if (typeof pitchOrSeq === 'number') {
                const note = resolvePc(root, pitchOrSeq, scale);
                s.push(midiToFreq(note));
            } else if (Array.isArray(pitchOrSeq)) {
                const isMultiRow = pitchOrSeq.every(isDurationalSequence);

                if (isMultiRow) {
                    s.push(pitchOrSeq.map(seq => processSequence(seq, root, scale)));
                } else if (isDurationalSequence(pitchOrSeq)) {
                    s.push(processSequence(pitchOrSeq, root, scale));
                } else {
                    s.push(root, pitchOrSeq, scale); // restore
                    throw new Error('pchz expects pitchClass to be a number or a durational sequence from `dur`.');
                }
            } else {
                s.push(root, pitchOrSeq, scale); // restore
                throw new Error('pchz expects pitchClass to be a number or a durational sequence from `dur`.');
            }
        },
        description: 'Resolves a pitch class (PC) or a durational sequence of PCs to a frequency in Hertz within a given scale and root.',
        effect: '[N_root (N_pc | [[N_pc, D1]..]) L_scale] -> [N_hz | [[F_hz, D1]..]]'
    },
    examples: [
        { code: '60 0 "major" scale pchz', assert: s => Math.abs(s[0] - 261.6255) < 1e-4 }, // C4
        { code: '60 7 "major" scale pchz', assert: s => Math.abs(s[0] - 523.2511) < 1e-4 },  // C5
        {
            code: '60 (0 q 2 e) dur "major" scale pchz',
            assert: s => {
                const result = s[0];
                if (!Array.isArray(result) || result.length !== 2) return false;
                const [note1, note2] = result;
                return Math.abs(note1[0] - 261.6255) < 1e-4 && note1[1] === 0.25 &&
                       Math.abs(note2[0] - 329.6275) < 1e-4 && note2[1] === 0.125;
            },
            expectedDescription: 'A durational sequence of frequencies: [[261.62, 0.25], [329.62, 0.125]]'
        }
    ]
};
