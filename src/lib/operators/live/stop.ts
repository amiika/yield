


import type { Operator, StackValue } from '../../types';
import { audioEngine } from '../../audio/AudioEngine';

export const stop: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            if (s.length < 1) {
                throw new Error('stop expects a name on the stack.');
            }
            const targetNameRaw = s.pop();
            let targetName: string;

            if (typeof targetNameRaw === 'symbol') {
                const key = Symbol.keyFor(targetNameRaw);
                if (!key) throw new Error('stop: Invalid symbol for patch or loop name.');
                targetName = `:${key}`;
            } else if (typeof targetNameRaw === 'string') {
                targetName = targetNameRaw;
            } else {
                 s.push(targetNameRaw); // Push back and throw
                throw new Error('stop expects a name or symbol for the patch or live loop to stop.');
            }

            // 1. Attempt to stop an audio voice with this name.
            // The audio engine uses the bare name (without a colon) as the sourceId.
            const audioName = targetName.startsWith(':') ? targetName.slice(1) : targetName;
            const stoppedAudioIds = audioEngine.stop(audioName);
            if (options.onVoiceDestroyed) {
                stoppedAudioIds.forEach(id => options.onVoiceDestroyed(id));
            }

            // 2. Attempt to stop a live loop by removing it from the :loops list
            //    and canceling its next scheduled event.
            audioEngine.cancel(targetName);
            const loopsListKey = ':loops';
            const loopsListDef = dictionary[loopsListKey];
            const loopsListBody = (loopsListDef && 'body' in loopsListDef) ? loopsListDef.body : undefined;

            if (Array.isArray(loopsListBody)) {
                const index = loopsListBody.indexOf(targetName);
                if (index > -1) {
                    loopsListBody.splice(index, 1);
                }
            }
        },
        description: 'Stops a playing audio patch or a running live loop by its name. For live loops, it removes the loop name from the global `:loops` list, causing it to terminate on its next tick.',
        effect: '[S_name] -> []'
    },
    examples: [
        {
            replCode: [
                '120 tempo',
                '(() 1 live) myloop =>',
                'myloop',      // Starts the loop
            ],
            async: {
                duration: 150, // Wait for 1 beat to pass
                assert: (s, dict, asyncOutput) => {
                    const loopsList = dict[':loops']?.body;
                    return Array.isArray(loopsList) && loopsList.includes('myloop');
                },
                assertDescription: "myloop should be in :loops after starting."
            }
        },
        {
            replCode: [
                '120 tempo',
                '(() 1 live) myloop =>',
                'myloop',      // Starts the loop
                'myloop stop'  // Stop it
            ],
            async: {
                duration: 150, // Wait for 1 beat to pass
                assert: (s, dict, asyncOutput) => {
                    const loopsList = dict[':loops']?.body;
                    return Array.isArray(loopsList) && !loopsList.includes('myloop');
                },
                assertDescription: "myloop should not be in :loops after being stopped."
            }
        },
        {
            replCode: [
                '120 tempo',
                '(() 1 live) :myloop =>',
                ':myloop',      // Starts the loop
                ':myloop stop'  // Stop it
            ],
            async: {
                duration: 150, // Wait for 1 beat to pass
                assert: (s, dict, asyncOutput) => {
                    const loopsList = dict[':loops']?.body;
                    return Array.isArray(loopsList) && !loopsList.includes(':myloop');
                },
                assertDescription: ":myloop should not be in :loops after being stopped."
            }
        }
    ]
};