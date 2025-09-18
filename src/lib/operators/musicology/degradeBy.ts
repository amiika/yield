
import type { Operator } from '../../types';

const isDurationalSequence = (list: any): list is any[] => {
    if (!Array.isArray(list)) return false;
    if (list.length === 0) return true;
    const first = list[0];
    return Array.isArray(first) && (first.length === 2 || first.length === 3);
};

export const degradeBy: Operator = {
    definition: {
        exec: function*(s) {
            const probability = s.pop() as number;
            const list = s.pop();

            if (typeof probability !== 'number' || probability < 0 || probability > 1) {
                throw new Error('degradeBy expects a probability between 0 and 1.');
            }
            if (!isDurationalSequence(list)) {
                throw new Error('degradeBy expects a durational sequence from `dur`.');
            }

            const degradedList = list.map(item => {
                if (Math.random() < probability) {
                    const newItem = [null, item[1]];
                    if (item.length > 2) {
                        newItem.push(item[2]); // Keep lyric
                    }
                    return newItem;
                }
                return item;
            });

            s.push(degradedList);
        },
        description: `Randomly removes notes from a sequence by turning them into rests. It takes a probability (0 to 1) that determines the chance of any given note being removed. For a 50% chance, use \`0.5 degradeBy\`.`,
        effect: `[L_dur_sequence N_probability] -> [L_new_sequence]`
    },
    examples: [
        {
            code: '(60 q 62 q 64 q 65 q) dur 1.0 degradeBy',
            assert: s => {
                const res = s[0];
                return Array.isArray(res) && res.length === 4 && res.every(item => item[0] === null);
            },
            expectedDescription: 'A sequence where all notes have been replaced by rests.'
        }
    ]
};