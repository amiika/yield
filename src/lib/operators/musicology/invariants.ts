
import type { Operator } from '../../types';

export const invariants: Operator = {
    definition: {
        exec: function*(s) {
            const listB = s.pop();
            const listA = s.pop();

            if (!Array.isArray(listA) || !Array.isArray(listB)) {
                throw new Error('invariants expects two lists of pitch classes.');
            }

            const setA = new Set(listA.map(pc => (pc % 12 + 12) % 12));
            const setB = new Set(listB.map(pc => (pc % 12 + 12) % 12));

            const intersection = [...setA].filter(x => setB.has(x)).sort((a,b) => a-b);
            s.push(intersection);
        },
        description: 'Finds the invariant (common) pitch classes between two sets (lists). The result is a sorted list of the unique common pitch classes.',
        effect: '[L_setA L_setB] -> [L_commonPcs]'
    },
    examples: [
        {
            code: '(0 1 2 3) (2 3 4 5) invariants',
            expected: [[2, 3]]
        },
        {
            code: `
# A row where P0 and I5 share 4 common tones in their first hexachords
(0 1 4 2 9 5)  # first hexachord of P0
(5 4 1 3 8 0)  # first hexachord of I5
invariants`,
            expected: [[0, 1, 4, 5]],
            expectedDescription: "A list of the 4 pitch classes common to both hexachords."
        },
    ]
};