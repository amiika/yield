


import type { Operator } from '../../types';
import { audioEngine } from '../../audio/AudioEngine';

export const kill: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            if (s.length < 1) {
                throw new Error('kill expects a name on the stack.');
            }
            const targetNameRaw = s.pop();
            let dictKey: string;
            let nameForError: string;

            if (typeof targetNameRaw === 'symbol') {
                const key = Symbol.keyFor(targetNameRaw);
                if (!key) throw new Error('kill: Invalid symbol.');
                dictKey = `:${key}`;
                nameForError = `:${key}`;
            } else if (typeof targetNameRaw === 'string' || typeof targetNameRaw === 'number') {
                dictKey = String(targetNameRaw);
                nameForError = String(targetNameRaw);
            } else {
                s.push(targetNameRaw); // Push back and throw
                throw new Error(`kill expects a name, symbol, or number, but got ${typeof targetNameRaw}.`);
            }

            // --- Step 1: Stop any active processes associated with the name ---

            // 1a. Stop audio voice
            const audioName = nameForError.startsWith(':') ? nameForError.slice(1) : nameForError;
            const stoppedAudioIds = audioEngine.stop(audioName);
            if (options.onVoiceDestroyed) {
                stoppedAudioIds.forEach(id => options.onVoiceDestroyed(id));
            }

            // 1b. Stop live loop
            audioEngine.cancel(dictKey); // Cancel scheduled callback
            const loopsListKey = ':loops';
            const loopsListDef = dictionary[loopsListKey];
            const loopsListBody = (loopsListDef && 'body' in loopsListDef) ? loopsListDef.body : undefined;

            if (Array.isArray(loopsListBody)) {
                const index = loopsListBody.indexOf(dictKey);
                if (index > -1) {
                    loopsListBody.splice(index, 1);
                }
            }
            
            // --- Step 2: Remove the word from the dictionary ---

            const definition = dictionary[dictKey];
            if (!definition) {
                throw new Error(`Cannot kill '${nameForError}': word not found.`);
            }

            if (options.builtInKeys.has(dictKey)) {
                throw new Error(`Cannot kill built-in operator '${nameForError}'.`);
            }
            
            // This is a sufficient check for user-defined words.
            delete dictionary[dictKey];
        },
        description: 'Stops any active process (audio patch or live loop) associated with a name and removes that word from the user dictionary.',
        effect: '[S_name] -> []'
    },
    examples: [
        {
            replCode: ['10 myvar =', 'myvar kill', 'myvar'],
            expected: ['myvar']
        },
        {
            code: "10 myvar = myvar myvar kill myvar = myvar",
            expected: [10]
        },
        {
            replCode: ['(1 +) inc =>', 'inc kill', '1 inc'],
            expected: [1, 'inc']
        },
        {
            replCode: [
                '120 tempo',
                '(() 1 live) myloop =>',
                'myloop', // Start the loop
                'myloop kill'
            ],
            async: {
                duration: 150, // wait for a beat to pass
                assert: (s, dict) => {
                    const loopsList = dict[':loops']?.body;
                    const isLoopStopped = Array.isArray(loopsList) && !loopsList.includes('myloop');
                    const isDictEntryRemoved = !dict.hasOwnProperty('myloop');
                    return isLoopStopped && isDictEntryRemoved;
                },
                assertDescription: "The loop should be stopped and the 'myloop' definition removed."
            }
        },
        {
            replCode: ['not_found kill'],
            expectedError: "Cannot kill 'not_found': word not found."
        },
        {
            replCode: ['+ kill'],
            expectedError: "Cannot kill built-in operator '+'."
        },
        {
            replCode: [
                '() :mydata =',
                ':mydata kill',
                ':mydata'
            ],
            expected: [Symbol.for('mydata')]
        }
    ]
};