
import type { Operator } from '../../types';

const isDurationalSequence = (list: any): list is any[] => {
    if (!Array.isArray(list)) return false;
    if (list.length === 0) return true;
    const first = list[0];
    return Array.isArray(first) && (first.length === 2 || first.length === 3);
};

export const ply: Operator = {
    definition: {
        exec: function*(s) {
            const count = s.pop() as number;
            const list = s.pop();

            if (typeof count !== 'number' || !Number.isInteger(count) || count < 0) {
                throw new Error('ply expects a non-negative integer count.');
            }
            if (!isDurationalSequence(list)) {
                throw new Error('ply expects a durational sequence from `dur`.');
            }
            
            if (count === 0) {
                s.push([]);
                return;
            }

            const result = list.flatMap(item => {
                const [note, duration, lyric] = item;
                const newDuration = duration / count;
                const repeated: any[][] = [];
                for (let i = 0; i < count; i++) {
                    const newItem = [note, newDuration];
                    // Attach lyric only to the first repetition
                    if (i === 0 && lyric !== undefined) {
                        newItem.push(lyric);
                    }
                    repeated.push(newItem);
                }
                return repeated;
            });

            s.push(result);
        },
        description: `Repeats each event in a sequence a given number of times, subdividing its duration equally among the repetitions.`,
        effect: `[L_dur_sequence N_count] -> [L_new_sequence]`
    },
    examples: [
        {
            code: '(60 h 62 h) dur 2 ply',
            expected: [ [[60, 0.25], [60, 0.25], [62, 0.25], [62, 0.25]] ]
        },
        {
            code: '(60 q "hi") dur 3 ply',
            expected: [ [[60, 0.25/3, "hi"], [60, 0.25/3], [60, 0.25/3]] ]
        }
    ]
};
