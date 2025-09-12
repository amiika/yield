import type { Operator } from '../../types';
import { audioEngine } from '../../audio/AudioEngine';

export const tempo: Operator = {
    definition: {
        exec: function*(s) {
            if (s.length < 1) return;
            const newTempo = s.pop() as number;
            audioEngine.setTempo(newTempo);
        },
        description: 'Sets the global tempo in Beats Per Minute (BPM), consuming the value from the stack.',
        effect: '[N_bpm] -> []'
    },
    examples: [
        { code: '120 tempo', expected: [] }
    ]
};