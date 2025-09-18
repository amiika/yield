import type { Operator } from '../../types';

export const isaggregate: Operator = {
    definition: {
        exec: function*(s) {
            const list = s.pop();
            if (!Array.isArray(list)) {
                s.push(false);
                return;
            }
            const pitchClasses = new Set(list.map(pc => (pc % 12 + 12) % 12));
            const hasAll12 = pitchClasses.size === 12;
            s.push(hasAll12);
        },
        description: 'Tests if a list contains all 12 unique pitch classes (0-11).',
        effect: '[L_list] -> [B_bool]'
    },
    examples: [
        { code: '(0 1 2 3 4 5 6 7 8 9 10 11) isaggregate', expected: [true] },
        { code: '(0 1 2 3 4 5 6 7 8 9 10 10) isaggregate', expected: [false] },
        { code: '(12 13 14 15 16 17 18 19 20 21 22 23) isaggregate', expected: [true] }, // tests modulo
        { code: '() isaggregate', expected: [false] },
    ]
};
