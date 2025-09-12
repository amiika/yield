
import type { Operator } from '../../types';
import { audioEngine } from '../../audio/AudioEngine';

export const hush: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            // 1. Stop all audio engine processes (voices and scheduled callbacks)
            audioEngine.stopAll();

            // 2. Clear the interpreter's list of active loops to reflect the state change
            const loopsListKey = ':loops';
            const loopsListDef = dictionary[loopsListKey];
            if (loopsListDef && 'body' in loopsListDef && Array.isArray(loopsListDef.body)) {
                loopsListDef.body.length = 0; // Clear the array
            }
        },
        description: 'Stops all currently playing audio voices and terminates all live loops immediately.',
        effect: '[] -> []'
    },
    examples: [
        { code: 'hush', expected: [] }
    ]
};
