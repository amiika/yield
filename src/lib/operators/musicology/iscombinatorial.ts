import type { Operator } from '../../types';

export const iscombinatorial: Operator = {
    definition: {
        exec: function*(s) {
            const listB = s.pop();
            const listA = s.pop();
            if (!Array.isArray(listA) || !Array.isArray(listB)) {
                s.push(false);
                return;
            }
            const combined = [...listA, ...listB];
            const pitchClasses = new Set(combined.map(pc => (pc % 12 + 12) % 12));
            const hasAll12 = pitchClasses.size === 12;
            s.push(hasAll12);
        },
        description: 'Tests if two lists of pitch classes are combinatorially related, i.e., their union forms a complete aggregate of 12 unique pitch classes.',
        effect: '[L_listA L_listB] -> [B_bool]'
    },
    examples: [
        { code: '(0 1 2 3 4 5) (6 7 8 9 10 11) iscombinatorial', expected: [true] },
        { code: '(0 1 2 3 4 5) (5 6 7 8 9 10) iscombinatorial', expected: [false] },
    ]
};
