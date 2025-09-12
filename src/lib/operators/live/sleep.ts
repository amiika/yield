
import type { Operator } from '../../types';

export const sleep: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            const beats = s.pop();
            if (typeof beats !== 'number' || beats < 0) {
                s.push(beats); // push back if it's not a valid number
                throw new Error('sleep expects a non-negative number for beat duration.');
            }

            const tempoDef = dictionary[':tempo'];
            const bpm = (tempoDef && 'body' in tempoDef && typeof tempoDef.body === 'number' ? tempoDef.body : 120) as number;
            const secondsPerBeat = 60.0 / bpm;
            const sleepDurationMs = beats * secondsPerBeat * 1000;

            if (sleepDurationMs > 0) {
                yield new Promise(resolve => setTimeout(resolve, sleepDurationMs));
            }
        },
        description: 'Pauses the execution of the current program for a specified number of beats. The main program execution is halted during the sleep period.',
        effect: '[N_beats] -> []'
    },
    examples: [
        {
            replCode: ['120 tempo', '1', '0.5 sleep', '2'],
            async: {
                duration: 600, // 0.5 beat @ 120bpm = 250ms. Wait 600ms to be safe.
                assert: (s) => s.length === 2 && s[0] === 1 && s[1] === 2,
                assertDescription: "The stack should contain [1 2] after the sleep."
            }
        },
        {
            replCode: ['120 tempo', '(0.25 sleep 1 +) inc =>', '0', 'inc'],
            async: {
                duration: 200, // 0.25 beat @ 120bpm = 125ms. Wait 200ms.
                assert: (s) => s.length === 1 && s[0] === 1,
                assertDescription: "The stack should contain [1] after the program with sleep executes."
            }
        }
    ]
};
