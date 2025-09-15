
import type { Operator } from '../../types';

const audioOps = new Set(['sine', 'saw', 'pulse', 'noise', 'lpf', 'hpf', 'ad', 'adsr', 'delay', 'distort', 'pan', 'note', 'seq', 'impulse', 'mix', 'mul']);
const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string' && audioOps.has(v[v.length - 1]);

export const seq: Operator = {
    definition: {
        exec: function*(s) {
            const list = s.pop();
            if (!Array.isArray(list)) {
                throw new Error('seq expects a list of values.');
            }

            if (s.length > 0 && isAudioQuotation(s[s.length - 1])) {
                const clockQuotation = s.pop() as any[];
                s.push([clockQuotation, list, 'seq']);
            } else {
                s.push([null, list, 'seq']);
            }
        },
        description: 'Creates a step sequencer quotation that converts a list of values into a stepped audio signal. It steps through the list on each tick of a clock signal. If no clock (e.g., from `impulse`) is on the stack, it expects to be used with `play`, which will auto-generate a clock to fit the sequence into the specified duration.',
        effect: '[L_clock_quotation]? [L_values] -> [L_quotation]'
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
8 impulse         # Clock at 8Hz (eighth notes)
5 8 euclidean   # Generate the pattern [1,0,1,0,1,0,1,1]
seq               # Create the sequencer
bd                # Use the 0s and 1s to gate a bass drum
0.8 mul start`,
            async: {
                duration: 500,
                assert: s => s.length === 0,
                assertDescription: "Stack should be empty after starting the audio."
            }
        }
    ]
};