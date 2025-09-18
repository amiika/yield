import type { Operator } from '../../types';

export const hz: Operator = {
    definition: {
        exec: function*(s) {
            const note = s.pop() as number;
            if (typeof note !== 'number') {
                throw new Error('hz expects a number (MIDI note).');
            }
            const freq = 440 * Math.pow(2, (note - 69) / 12);
            s.push(freq);
        },
        description: 'Converts a MIDI note number to its frequency in Hertz.',
        effect: '[N_midi] -> [N_hz]'
    },
    examples: [
        { code: '69 hz', expected: [440] },
        { code: '60 hz', assert: s => Math.abs(s[0] - 261.6255) < 1e-4 }
    ]
};