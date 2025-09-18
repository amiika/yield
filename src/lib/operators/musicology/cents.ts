import type { Operator } from '../../types';

export const cents: Operator = {
    definition: {
        exec: function*(s) {
            let centsList = s.pop();
            if (!Array.isArray(centsList)) {
                throw new Error('cents expects a list of numbers.');
            }

            if (centsList.length === 0 || centsList[0] !== 0) {
                centsList = [0, ...centsList];
            }

            const semitoneScale: number[] = [];
            for (let i = 0; i < centsList.length - 1; i++) {
                const semitoneInterval = (centsList[i + 1] - centsList[i]) / 100;
                semitoneScale.push(semitoneInterval);
            }
            s.push(semitoneScale);
        },
        description: 'Converts a microtonal scale defined as a list of cents into a list of semitone intervals, which can be used as a custom scale.',
        effect: '[L_cents] -> [L_semitones]'
    },
    examples: [
        { code: '(100 200 350 450 600) cents', expected: [[1, 1, 1.5, 1, 1.5]] },
        { code: '(1200) cents', expected: [[12]] }, // An octave
        { code: '() cents', expected: [[]] },
    ]
};