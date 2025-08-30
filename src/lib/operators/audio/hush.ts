import type { Operator } from '../../types';
import { audioEngine } from '../../audio/AudioEngine';

export const hush: Operator = {
    definition: {
        exec: function*(s) {
            audioEngine.stopAll();
        },
        description: 'Stops all currently playing audio voices immediately.',
        example: 'hush',
        effect: '[] -> []'
    },
    testCases: [
        { code: 'hush', expected: [] }
    ]
};
