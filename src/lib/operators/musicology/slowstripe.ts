
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

export const slowstripe: Operator = {
    definition: {
        exec: function*(s) {
            const count = s.pop() as number;
            const list = s.pop();

            if (typeof count !== 'number' || !Number.isInteger(count) || count <= 0) {
                throw new Error('slowstripe expects a positive integer count.');
            }
            if (!isDurationalSequence(list)) {
                throw new Error('slowstripe expects a durational sequence from `dur`.');
            }

            const totalDuration = getTotalDuration(list);
            if (totalDuration === 0) {
                s.push([]);
                return;
            }
            
            const newTotalDuration = totalDuration * count;

            // Generate random weights that sum to 1
            const weights = Array.from({ length: count }, () => Math.random());
            const sum = weights.reduce((a, b) => a + b, 0);
            const normalizedWeights = weights.map(w => w / sum);
            
            const newDurations = normalizedWeights.map(w => w * newTotalDuration);

            const result = newDurations.flatMap(newDur => {
                const scaleFactor = newDur / totalDuration;
                return scaleDurations(list, scaleFactor);
            });
            
            s.push(result);
        },
        description: `Similar to 'stripe', but the resulting sequence is slowed down by the given count. The total duration of the new sequence will be N times the original duration.`,
        effect: `[L_dur_sequence N_count] -> [L_new_sequence]`
    },
    examples: [
        {
            code: '(60 h 62 h) dur 3 slowstripe',
            assert: s => {
                const res = s[0];
                const totalDur = getTotalDuration(res);
                return res.length === 6 && Math.abs(totalDur - 3.0) < 1e-9;
            },
            expectedDescription: 'A 6-note sequence with a total duration of 3.0.'
        }
    ]
};
