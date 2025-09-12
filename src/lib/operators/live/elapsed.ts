import type { Operator } from '../../types';
import { audioEngine } from '../../audio/AudioEngine';

export const elapsed: Operator = {
    definition: {
        exec: function*(s) {
            s.push(audioEngine.getElapsedTime());
        },
        description: 'Pushes the elapsed time since the master audio clock started (in seconds).',
        effect: '-> [N_seconds]'
    },
    examples: [
        { 
            code: 'elapsed', 
            assert: s => typeof s[0] === 'number',
            expectedDescription: 'A number representing the elapsed time.'
        }
    ]
};
