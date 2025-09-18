
import type { Operator } from '../../types';

const isDurationalSequence = (list: any): list is any[] => {
    if (!Array.isArray(list)) return false;
    if (list.length === 0) return true;
    const first = list[0];
    return Array.isArray(first) && (first.length === 2 || first.length === 3);
};

const getTotalDuration = (list: any[]): number => list.reduce((sum, item) => sum + item[1], 0);

export const cram: Operator = {
    definition: {
        exec: function*(s) {
            const fraction = s.pop() as number;
            const list = s.pop();

            if (typeof fraction !== 'number' || fraction < 0 || fraction > 1) {
                throw new Error('cram expects a fraction between 0 and 1.');
            }
            if (!isDurationalSequence(list)) {
                throw new Error('cram expects a durational sequence from `dur`.');
            }

            const totalDuration = getTotalDuration(list);
            const targetDuration = totalDuration * fraction;
            
            const result = [];
            let accumulatedDuration = 0;

            for (const item of list) {
                const itemDuration = item[1];
                if (accumulatedDuration + itemDuration > targetDuration) {
                    const remainingDuration = targetDuration - accumulatedDuration;
                    if (remainingDuration > 1e-9) { // Avoid adding zero-duration notes
                         const newItem = [item[0], remainingDuration];
                         if (item.length > 2) newItem.push(item[2]);
                         result.push(newItem);
                    }
                    break;
                } else {
                    result.push(item);
                    accumulatedDuration += itemDuration;
                }
            }

            s.push(result);
        },
        description: `Truncates a sequence, playing only a given fraction of its total duration. The last note is trimmed to fit the exact duration.`,
        effect: `[L_dur_sequence N_fraction] -> [L_new_sequence]`
    },
    examples: [
        {
            code: '(60 q 62 h 64 q) dur 0.5 cram', // total dur = 1, target = 0.5
            expected: [ [[60, 0.25], [62, 0.25]] ]
        },
        {
            code: '(60 w) dur 0.75 cram',
            expected: [ [[60, 0.75]] ]
        }
    ]
};
