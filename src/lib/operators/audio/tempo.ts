import type { Operator } from '../../types';
import { audioEngine } from '../../audio/AudioEngine';

export const tempo: Operator = {
    definition: {
        exec: function*(s) {
            if (s.length < 1) return;
            const newTempo = s.pop() as number;
            audioEngine.setTempo(newTempo);
            s.push(newTempo);
        },
        description: 'Sets the global tempo in Beats Per Minute (BPM), then pushes the tempo value back onto the stack.',
        example: '120 tempo',
        effect: '[N_bpm] -> [N_bpm]'
    },
    testCases: [
        { code: '120 tempo', expected: [120] }
    ]
};