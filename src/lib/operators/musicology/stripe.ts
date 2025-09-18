
import type { Operator } from '../../types';

const isDurationalSequence = (list: any): list is any[] => {
    if (!Array.isArray(list)) return false;
    if (list.length === 0) return true;
    const first = list[0];
    return Array.isArray(first) && (first.length === 2 || first.length === 3);
};

const getTotalDuration = (list: any[]): number => list.reduce((sum, item) => sum + item[1], 0);

const scaleDurations = (list: any[], factor: number): any[] => {
    return list.map(item => {
        const newItem = [item[0], item[1] * factor];
        if (item.length > 2) newItem.push(item[2]);
        return newItem;
    });
};

export const stripe: Operator = {
    definition: {
        exec: function*(s) {
            const count = s.pop() as number;
            const list = s.pop();

            if (typeof count !== 'number' || !Number.isInteger(count) || count <= 0) {
                throw new Error('stripe expects a positive integer count.');
            }
            if (!isDurationalSequence(list)) {
                throw new Error('stripe expects a durational sequence from `dur`.');
            }

            const totalDuration = getTotalDuration(list);
            if (totalDuration === 0) {
                s.push([]);
                return;
            }

            // Generate random weights that sum to 1
            const weights = Array.from({ length: count }, () => Math.random());
            const sum = weights.reduce((a, b) => a + b, 0);
            const normalizedWeights = weights.map(w => w / sum);
            
            const newDurations = normalizedWeights.map(w => w * totalDuration);

            const result = newDurations.flatMap(newDur => {
                const scaleFactor = newDur / totalDuration;
                return scaleDurations(list, scaleFactor);
            });
            
            s.push(result);
        },
        description: `Repeats a sequence a given number of times, but with each repetition played at a random speed. The total duration of the resulting sequence is the same as the original.`,
        effect: `[L_dur_sequence N_count] -> [L_new_sequence]`
    },
    examples: [
        {
            code: '(60 h 62 h) dur 3 stripe',
            assert: s => {
                const res = s[0];
                const totalDur = getTotalDuration(res);
                return res.length === 6 && Math.abs(totalDur - 1.0) < 1e-9;
            },
            expectedDescription: 'A 6-note sequence with a total duration of 1.0.'
        }
    ]
};
