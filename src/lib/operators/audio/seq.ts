
import type { Operator, StackValue } from '../../types';

const audioOps = new Set(['sine', 'saw', 'pulse', 'noise', 'lpf', 'hpf', 'ad', 'adsr', 'delay', 'distort', 'pan', 'note', 'seq', 'impulse', 'mix', 'mul']);
const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string' && audioOps.has(v[v.length - 1]);

// Helper to check if a list consists of [value, duration] pairs
const isDurationalSequence = (list: any[]): boolean => {
    if (list.length === 0) return false;
    const first = list[0];
    return Array.isArray(first) && first.length === 2 && typeof first[1] === 'number';
};

export const seq: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            const list = s.pop() as any[];
            if (!Array.isArray(list)) {
                throw new Error('seq expects a list of values.');
            }

            let clockQuotation: StackValue[] | null = null;
            if (s.length > 0 && isAudioQuotation(s[s.length - 1])) {
                clockQuotation = s.pop() as any[];
            }

            if (isDurationalSequence(list) && clockQuotation) {
                // --- New logic to handle durational sequences ---
                const clockOp = clockQuotation[clockQuotation.length - 1];
                if (clockOp !== 'impulse' || typeof clockQuotation[0] !== 'number') {
                    s.push(clockQuotation, list); // push back
                    throw new Error('Sequences with durations currently only support a simple `impulse` clock.');
                }
                const clockFreq = clockQuotation[0];

                const tempoDef = dictionary[':tempo'];
                const bpm = (tempoDef && 'body' in tempoDef && typeof tempoDef.body === 'number' ? tempoDef.body : 120) as number;
                const secondsPerBeat = 60.0 / bpm;
                const ticksPerBeat = clockFreq * secondsPerBeat;

                const flattenedList: (number | null)[] = [];
                for (const item of list) {
                    if (Array.isArray(item) && item.length === 2) {
                        const [note, durationBeats] = item;
                        const numTicks = Math.max(1, Math.round(durationBeats * ticksPerBeat));
                        for (let i = 0; i < numTicks; i++) {
                            flattenedList.push(note);
                        }
                    }
                }
                s.push([clockQuotation, flattenedList, 'seq']);

            } else {
                // --- Original logic ---
                s.push([clockQuotation, list, 'seq']);
            }
        },
        description: 'Creates a step sequencer quotation. It can sequence a simple list of values, stepping through them on each tick of a clock signal. It can also sequence a list of `[value, duration_in_beats]` pairs (from the `dur` operator), automatically holding each value for the correct number of clock ticks.',
        effect: '[L_clock_quotation]? [L_values|L_events] -> [L_quotation]'
    },
    examples: [
        {
            code: "# With an explicit clock for continuous play\n8 impulse (60 64 67 72) note seq sine 0.5 mul start",
            expected: []
        },
        {
            code: "# With an implicit clock for timed play\n# Plays 4 notes over a duration of 0.5 beats.\n(60 64 67 72) note seq sine 0.4 mul 0.5 play",
            expected: []
        },
        {
            replCode: `
# Using a Euclidean rhythm to generate the sequence values
120 tempo
8 impulse         # 8th note clock
5 8 euclidean   # Generate the pattern [1,0,1,0,1,0,1,1]
seq               # Create the sequencer
bd                # Use the 0s and 1s to gate a bass drum
0.8 mul start`,
            async: {
                duration: 500,
                assert: s => s.length === 0,
                assertDescription: "Stack should be empty after starting the audio."
            }
        },
        {
            replCode: `
# Playing a sequence with durations
120 tempo
16 impulse # 16th note clock
(60 q 62 e 64 e) dur # A sequence with quarter and eighth notes
seq note sine 0.4 mul start
`,
            async: {
                duration: 500,
                assert: s => s.length === 0,
                assertDescription: "A melody with varied note lengths should start playing."
            }
        }
    ]
};
