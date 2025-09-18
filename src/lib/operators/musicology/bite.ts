
import type { Operator } from '../../types';

const isDurationalSequence = (list: any): list is any[] => {
    if (!Array.isArray(list)) return false;
    if (list.length === 0) return true;
    const first = list[0];
    return Array.isArray(first) && (first.length === 2 || first.length === 3);
};

const getTotalDuration = (list: any[]): number => list.reduce((sum, item) => sum + item[1], 0);

const sliceByTime = (list: any[], startTime: number, endTime: number): any[] => {
    const result = [];
    let accumulatedDuration = 0;
    for (const item of list) {
        const itemStart = accumulatedDuration;
        const itemEnd = itemStart + item[1];

        if (itemEnd > startTime && itemStart < endTime) {
            const start = Math.max(itemStart, startTime);
            const end = Math.min(itemEnd, endTime);
            const newDuration = end - start;
            if (newDuration > 1e-9) {
                const newItem = [item[0], newDuration];
                if(item.length > 2) newItem.push(item[2]);
                result.push(newItem);
            }
        }
        accumulatedDuration = itemEnd;
    }
    return result;
};

export const bite: Operator = {
    definition: {
        exec: function*(s) {
            const pattern = s.pop();
            const numSlices = s.pop() as number;
            const list = s.pop();

            if (!Array.isArray(pattern)) throw new Error('bite expects a list of indices for the pattern.');
            if (typeof numSlices !== 'number' || !Number.isInteger(numSlices) || numSlices <= 0) {
                throw new Error('bite expects a positive integer for the number of slices.');
            }
            if (!isDurationalSequence(list)) {
                throw new Error('bite expects a durational sequence from `dur`.');
            }

            const totalDuration = getTotalDuration(list);
            if (totalDuration === 0) {
                s.push([]);
                return;
            }
            
            const sliceDuration = totalDuration / numSlices;
            const slices = [];
            for (let i = 0; i < numSlices; i++) {
                slices.push(sliceByTime(list, i * sliceDuration, (i + 1) * sliceDuration));
            }

            const result = pattern.flatMap(index => {
                if (typeof index !== 'number' || !Number.isInteger(index) || index < 0 || index >= numSlices) {
                    return [];
                }
                return slices[index];
            });
            
            s.push(result);
        },
        description: `Slices a sequence into a number of equal-duration parts, then reassembles them according to a pattern of indices.`,
        effect: `[L_dur_sequence N_slices L_pattern] -> [L_new_sequence]`
    },
    examples: [
        {
            code: '(60 q 62 q 64 q 65 q) dur 4 (3 2 1 0) bite', // Reverse the measures
            expected: [ [[65, 0.25], [64, 0.25], [62, 0.25], [60, 0.25]] ]
        },
        {
            code: '(60 h 62 h) dur 2 (0 0 1 1) bite', // Repeat each half
            expected: [ [[60, 0.5], [60, 0.5], [62, 0.5], [62, 0.5]] ]
        }
    ]
};
