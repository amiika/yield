
import type { Operator } from '../../types';

const isDurationalSequence = (list: any): list is any[] => {
    if (!Array.isArray(list)) return false;
    if (list.length === 0) return true;
    const first = list[0];
    return Array.isArray(first) && (first.length === 2 || first.length === 3);
};

export const palindrome: Operator = {
    definition: {
        exec: function*(s) {
            const list = s.pop();
            if (!isDurationalSequence(list)) {
                throw new Error('palindrome expects a durational sequence from `dur`.');
            }

            if (list.length === 0) {
                s.push([]);
                return;
            }

            const reversed = [...list].reverse();
            s.push([...list, ...reversed]);
        },
        description: `Makes a sequence a palindrome by appending its reverse to itself.`,
        effect: `[L_dur_sequence] -> [L_new_sequence]`
    },
    examples: [
        {
            code: '(60 q 62 h) dur palindrome',
            expected: [ [[60, 0.25], [62, 0.5], [62, 0.5], [60, 0.25]] ]
        }
    ]
};
