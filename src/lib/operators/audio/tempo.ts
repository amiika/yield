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
        effect: '[N_bpm] -> [N_bpm]'
    },
    // FIX: Renamed 'testCases' to 'examples' to match the Operator type.
    examples: [
        { code: '120 tempo', expected: [120] }
    ]
};