import type { Operator } from '../../types';
import { audioEngine } from '../../audio/AudioEngine';

export const origin: Operator = {
    definition: {
        exec: function*(s) {
            s.push(audioEngine.getStartTime());
        },
        description: 'Pushes the start time of the master audio clock (in seconds).',
        effect: '-> [N_seconds]'
    },
    examples: [
        { 
            code: 'origin', 
            assert: s => typeof s[0] === 'number',
            expectedDescription: 'A number representing the start time.'
        }
    ]
};
