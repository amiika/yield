
import type { Operator } from '../../types';

export const noteToHz: Operator = {
    definition: {
        exec: function*(s) {
            const note = s.pop() as number;
            if (typeof note !== 'number') {
                throw new Error('note->hz expects a number.');
            }
            const freq = Math.pow(2, (note - 69) / 12) * 440;
            s.push(freq);
        },
        description: 'Converts a MIDI note number to its frequency in Hertz.',
        effect: '[N_midi] -> [F_hz]'
    },
    examples: [
        { code: '69 note->hz', expected: [440] },
        { code: '60 note->hz', assert: s => Math.abs(s[0] - 261.6255) < 1e-4 }
    ]
};