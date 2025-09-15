
import type { Operator } from '../../types';

export const euclidean: Operator = {
    definition: {
        exec: function*(s) {
            const length = s.pop() as number;
            const pulses = s.pop() as number;

            if (typeof pulses !== 'number' || typeof length !== 'number' || !Number.isInteger(pulses) || !Number.isInteger(length) || pulses < 0 || length <= 0) {
                // Restore stack before throwing
                if (pulses !== undefined) s.push(pulses);
                if (length !== undefined) s.push(length);
                throw new Error('euclidean operator expects two non-negative integers (pulses, length) with length > 0.');
            }
            
            if (pulses >= length) {
                // More pulses than steps just fills all steps
                s.push(Array(length).fill(1));
                return;
            }

            if (pulses === 0) {
                s.push(Array(length).fill(0));
                return;
            }
            
            // This is the algorithm provided by the user
            const startsDescent = (list: number[], i: number): boolean => {
                const listLength = list.length;
                const nextIndex = (i + 1) % listLength;
                return list[i] > list[nextIndex];
            };

            const resList = Array.from(
                { length },
                (_, i) => (((pulses * (i - 1)) % length) + length) % length,
            );

            const cycle = resList.map((_, i) => startsDescent(resList, i));
            
            // Convert booleans to 1s and 0s
            s.push(cycle.map(b => b ? 1 : 0));
        },
        description: `Generates a Euclidean rhythm sequence as a list of 1s and 0s. A Euclidean rhythm is a pattern that distributes a number of pulses as evenly as possible over a number of steps. It takes two integers from the stack: the number of pulses and the total length of the sequence.`,
        effect: `[I_pulses I_length] -> [L_sequence]`
    },
    examples: [
        {
            code: '3 8 euclidean',
            expected: [[1, 0, 0, 1, 0, 0, 1, 0]]
        },
        {
            code: '5 8 euclidean',
            expected: [[1, 0, 1, 0, 1, 1, 0, 1]]
        },
        {
            code: '5 16 euclidean',
            expected: [[1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0]]
        },
        {
            code: '0 8 euclidean',
            expected: [[0, 0, 0, 0, 0, 0, 0, 0]]
        },
        {
            code: '8 8 euclidean',
            expected: [[1, 1, 1, 1, 1, 1, 1, 1]]
        },
        {
            code: '9 8 euclidean',
            expected: [[1, 1, 1, 1, 1, 1, 1, 1]]
        },
        {
            replCode: `
# Use a euclidean rhythm to sequence a bass drum
120 tempo
4 impulse            # Clock at 4Hz (quarter notes)
3 8 euclidean seq    # Sequencer to be used as a gate
bd                   # Bass drum consumes the sequencer as its gate
0.8 mul start`,
            async: {
                duration: 500,
                assert: s => s.length === 0,
                assertDescription: "Stack should be empty after starting the audio."
            }
        },
        {
            replCode: `
120 tempo
# Bass drum plays a 3-against-8 Tresillo rhythm
4 impulse 3 8 euclidean seq bd

# Snare drum plays a 5-against-8 Cinquillo rhythm, delayed by a 16th note
4 impulse 5 8 euclidean seq sd
0.125 0 delay

# Mix them together
mix 0.8 mul start`,
            async: {
                duration: 500,
                assert: s => s.length === 0,
                assertDescription: "Stack should be empty after starting the audio."
            }
        },
        {
            replCode: `
# Define drum patterns as reusable words using '='
120 tempo
(8 impulse 3 8 euclidean seq bd 0.9 mul) :kick =
(16 impulse 5 16 euclidean seq sd 0.8 mul) :snare =
(16 impulse 7 16 euclidean seq hh 0.6 mul) :hat =

# Create live loops for each pattern using '=>'
# The 'i' combinator is needed to execute the data quotations
(:kick i) 1 live :kick-loop =>
(:snare i) 1 live :snare-loop =>
(:hat i) 1 live :hat-loop =>

# Start all the loops
:kick-loop
:snare-loop
:hat-loop
`,
            async: {
                duration: 500, // wait long enough for loops to be registered
                assert: (s, dict) => {
                    const loopsList = dict[':loops']?.body;
                    return Array.isArray(loopsList) &&
                           loopsList.includes(':kick-loop') &&
                           loopsList.includes(':snare-loop') &&
                           loopsList.includes(':hat-loop');
                },
                assertDescription: "All three drum loops should be running."
            }
        }
    ]
};