

import type { Operator } from '../../types';
import { audioEngine } from '../../audio/AudioEngine';

export const hush: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            // 1. Stop all audio engine voices with a fade
            audioEngine.fadeOutAll();

            // 2. Clear the interpreter's list of active loops to reflect the state change
            const loopsListKey = ':loops';
            const loopsListDef = dictionary[loopsListKey];
            if (loopsListDef && 'body' in loopsListDef && Array.isArray(loopsListDef.body)) {
                loopsListDef.body.length = 0; // Clear the array
            }
        },
        description: 'Fades out and stops all currently playing audio voices and terminates all live loops immediately. This prevents audible clicks from abrupt stops.',
        effect: '[] -> []'
    },
    examples: [
        {
            replCode: `
# Start a simple beat
2 impulse bd start

# Schedule 'hush' to run after 1 beat (500ms at default 120bpm)
(hush) 1 wait
`,
            async: {
                duration: 600,
                assert: (s) => s.length === 0,
                assertDescription: "The sound should have stopped and the stack should be empty."
            }
        }
    ]
};