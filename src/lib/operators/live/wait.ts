

import type { Operator, StackValue } from '../../types';
import { audioEngine } from '../../audio/AudioEngine';

export const wait: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            const beats = s.pop();
            const quotation = s.pop();

            if (typeof beats !== 'number' || beats < 0) {
                s.push(quotation, beats); // push back
                throw new Error('wait expects a non-negative number for beat duration.');
            }
            if (!Array.isArray(quotation)) {
                s.push(quotation, beats); // push back
                throw new Error('wait expects a quotation.');
            }

            const tempoDef = dictionary[':tempo'];
            const bpm = (tempoDef && 'body' in tempoDef && typeof tempoDef.body === 'number' ? tempoDef.body : 120) as number;
            const secondsPerBeat = 60.0 / bpm;
            const waitDuration = beats * secondsPerBeat;
            const executionTime = audioEngine.getContextTime() + waitDuration;

            const callback = async () => {
                const mainStack = options.mainStack;
                if (!mainStack) {
                    const errorMsg = "Error in scheduled 'wait': Could not find main stack.";
                    if (options.onAsyncOutput) options.onAsyncOutput(errorMsg, true);
                    else console.error(errorMsg);
                    return;
                }
                try {
                    await options.run(quotation, mainStack, { ...options, onOutput: options.onAsyncOutput });
                    
                    if (options.onAsyncOutput) {
                        options.onAsyncOutput('YIELD_TICK', false);
                    }
                } catch(e) {
                    if (options.onAsyncOutput) {
                        options.onAsyncOutput(`Error in scheduled 'wait' execution: ${e.message}`, true);
                    } else {
                        console.error(`Error in scheduled 'wait' execution:`, e);
                    }
                }
            };
            
            // Give it a unique ID so it doesn't clash with other waits or loops
            const uniqueId = `wait_${Date.now()}_${Math.random()}`;
            audioEngine.schedule(uniqueId, executionTime, callback);
        },
        description: "Waits for a specified number of beats, then executes a quotation on the main stack. The main program continues without pausing.",
        effect: '[L_quotation N_beats] -> []'
    },
    examples: [
        {
            replCode: [
                '120 tempo',
                '(hush) 0.5 wait'
            ],
            assert: (s) => true,
            expectedDescription: 'Schedules `hush` to run after 0.5 beats (250ms at 120bpm).'
        },
        {
            replCode: [
                '240 tempo',
                '0 myvar =',
                '(100 myvar =) 0.125 wait',
            ],
            async: {
                duration: 50, // Wait for the event to fire (0.125 beats at 240bpm is ~31.25ms)
                assert: (s, dict) => {
                    const myvarBody = dict['myvar']?.body;
                    return myvarBody === 100;
                },
                assertDescription: "The scheduled program should modify the variable after the wait period."
            }
        }
    ]
};