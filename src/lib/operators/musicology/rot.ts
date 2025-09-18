
import type { Operator } from '../../types';

const isDurationalSequence = (list: any): list is any[] => {
    if (!Array.isArray(list)) return false;
    if (list.length === 0) return true;
    const first = list[0];
    return Array.isArray(first) && (first.length === 2 || first.length === 3);
};

export const rot: Operator = {
    definition: {
        exec: function*(s) {
            const n = s.pop() as number;
            const list = s.pop();

            if (typeof n !== 'number' || !Number.isInteger(n)) {
                throw new Error('rot expects an integer for the number of rotation steps.');
            }
            if (!isDurationalSequence(list)) {
                throw new Error('rot expects a durational sequence from `dur`.');
            }

            if (list.length === 0) {
                s.push([]);
                return;
            }

            const pitches = list.map(item => item[0]);
            const modN = n % pitches.length;
            const rotatedPitches = modN >= 0
                ? [...pitches.slice(-modN), ...pitches.slice(0, -modN)]
                : [...pitches.slice(-modN), ...pitches.slice(0, pitches.length + modN)];

            const result = list.map((item, i) => {
                const newItem = [rotatedPitches[i], item[1]];
                if (item.length > 2) newItem.push(item[2]);
                return newItem;
            });
            
            s.push(result);
        },
        description: `Rotates the pitches within a sequence by a number of steps, while keeping the rhythm and lyrics the same. A positive number rotates to the left (e.g., \`1 rot\` moves the last pitch to the first position).`,
        effect: `[L_dur_sequence N_steps] -> [L_new_sequence]`
    },
    examples: [
        {
            code: '(60 q 62 q 64 q) dur 1 rot',
            expected: [ [[64, 0.25], [60, 0.25], [62, 0.25]] ]
        },
        {
            code: '(60 q 62 q 64 q) dur -1 rot',
            expected: [ [[62, 0.25], [64, 0.25], [60, 0.25]] ]
        }
    ]
};
