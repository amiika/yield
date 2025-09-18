import type { Operator } from '../../types';
import { centsToHz } from './defaults';

// Helper to check if a list consists of [value, duration, lyric?] pairs
const isDurationalSequence = (list: any[]): boolean => {
    if (list.length === 0) return true;
    const first = list[0];
    return Array.isArray(first) && (first.length === 2 || first.length === 3) && (typeof first[0] === 'number' || first[0] === null) && typeof first[1] === 'number';
};

const processSequence = (sequence: any[], rootHz: number) => {
    return sequence.map(pair => {
        const cents = pair[0];
        const duration = pair[1];
        const lyric = pair[2];
        const newPair: any[] = [centsToHz(rootHz, cents), duration];
        if (lyric !== undefined) {
            newPair.push(lyric);
        }
        return newPair;
    });
};

export const centhz: Operator = {
    definition: {
        exec: function*(s) {
            const centsOrSeq = s.pop();
            const rootHz = s.pop() as number;

            if (typeof rootHz !== 'number') {
                s.push(rootHz, centsOrSeq); // restore
                throw new Error('centhz expects: rootHz (number), cents_value/sequence.');
            }

            if (typeof centsOrSeq === 'number') {
                s.push(centsToHz(rootHz, centsOrSeq));
            } else if (Array.isArray(centsOrSeq)) {
                const isMultiRow = centsOrSeq.every(isDurationalSequence);

                if (isMultiRow) {
                    s.push(centsOrSeq.map(seq => processSequence(seq, rootHz)));
                } else if (isDurationalSequence(centsOrSeq)) {
                    s.push(processSequence(centsOrSeq, rootHz));
                } else {
                     s.push(rootHz, centsOrSeq); // restore
                    throw new Error('centhz expects cents value to be a number or a durational sequence from `dur`.');
                }
            } else {
                s.push(rootHz, centsOrSeq); // restore
                throw new Error('centhz expects cents value to be a number or a durational sequence from `dur`.');
            }
        },
        description: 'Calculates a frequency in Hertz by applying a microtonal offset in cents to a root frequency. Can also transform a durational sequence of cents values.',
        effect: '[N_rootHz (N_cents | [[N_cents, D1]..])] -> [N_newHz | [[F_hz, D1]..]]'
    },
    examples: [
        { code: '440 1200 centhz', assert: s => Math.abs(s[0] - 880) < 1e-4 }, // Up one octave
        { code: '440 -1200 centhz', assert: s => Math.abs(s[0] - 220) < 1e-4 }, // Down one octave
        { code: '440 100 centhz', assert: s => Math.abs(s[0] - 466.1637) < 1e-4 }, // Up one semitone
        {
            code: '440 (0 q 100 e) dur centhz',
            assert: s => {
                const result = s[0];
                if (!Array.isArray(result) || result.length !== 2) return false;
                const [note1, note2] = result;
                return Math.abs(note1[0] - 440) < 1e-4 && note1[1] === 0.25 &&
                       Math.abs(note2[0] - 466.1637) < 1e-4 && note2[1] === 0.125;
            },
            expectedDescription: 'A durational sequence of frequencies: [[440.0, 0.25], [466.16, 0.125]]'
        }
    ]
};
