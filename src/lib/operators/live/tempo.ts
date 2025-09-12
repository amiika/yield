


import type { Operator } from '../../types';
import { audioEngine } from '../../audio/AudioEngine';

export const tempo: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            if (s.length < 1) {
                return;
            };
            const newTempo = s.pop() as number;
            if (typeof newTempo !== 'number' || newTempo <= 0) {
                s.push(newTempo); // push back
                throw new Error('tempo expects a positive number for BPM.');
            }

            // Set the tempo in the audio engine for the worklet
            audioEngine.setTempo(newTempo);

            // Set the global :tempo variable
            dictionary[':tempo'] = { body: newTempo, description: "Global tempo in BPM.", example: "120 tempo" };
        },
        description: 'Sets the global tempo in Beats Per Minute (BPM), consuming the value from the stack. Also sets the global `:tempo` variable.',
        effect: '[N_bpm] -> []'
    },
    examples: [
        { 
            replCode: ['120 tempo', ':tempo'],
            expected: [120]
        }
    ]
};