
import type { Operator } from '../../types';

const isDurationalSequence = (list: any): list is any[] => {
    if (!Array.isArray(list)) return false;
    if (list.length === 0) return true;
    const first = list[0];
    return Array.isArray(first) && (first.length === 2 || first.length === 3);
};

const getTotalDuration = (list: any[]): number => list.reduce((sum, item) => sum + item[1], 0);

const truncateToDuration = (list: any[], targetDuration: number): any[] => {
    const result = [];
    let accumulatedDuration = 0;
    for (const item of list) {
        const itemDuration = item[1];
        if (accumulatedDuration + itemDuration > targetDuration) {
            const remainingDuration = targetDuration - accumulatedDuration;
            if (remainingDuration > 1e-9) {
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
    return result;
};


export const linger: Operator = {
    definition: {
        exec: function*(s) {
            const fraction = s.pop() as number;
            const list = s.pop();

            if (typeof fraction !== 'number' || fraction < 0 || fraction > 1) {
                throw new Error('linger expects a fraction between 0 and 1.');
            }
            if (!isDurationalSequence(list)) {
                throw new Error('linger expects a durational sequence from `dur`.');
            }

            const originalTotalDuration = getTotalDuration(list);
            if (originalTotalDuration === 0) {
                s.push([]);
                return;
            }
            
            const lingerPart = truncateToDuration(list, originalTotalDuration * fraction);
            const lingerPartDuration = getTotalDuration(lingerPart);
            
            if (lingerPartDuration < 1e-9) {
                s.push([]);
                return;
            }

            const repeatCount = Math.floor(originalTotalDuration / lingerPartDuration);
            const remainingDuration = originalTotalDuration - repeatCount * lingerPartDuration;
            
            const result = [];
            for (let i = 0; i < repeatCount; i++) {
                result.push(...lingerPart);
            }

            const finalPart = truncateToDuration(lingerPart, remainingDuration);
            result.push(...finalPart);

            s.push(result);
        },
        description: `Truncates a sequence to a given fraction, then repeats that truncated part to fill the original total duration.`,
        effect: `[L_dur_sequence N_fraction] -> [L_new_sequence]`
    },
    examples: [
        {
            code: '(60 q 62 q 64 h) dur 0.5 linger', // total dur = 1, linger part dur = 0.5
            expected: [ [[60, 0.25], [62, 0.25], [60, 0.25], [62, 0.25]] ]
        },
        {
            code: '(60 q 62 q 64 q 65 q) dur 0.25 linger',
            expected: [ [[60, 0.25], [60, 0.25], [60, 0.25], [60, 0.25]] ]
        }
    ]
};
