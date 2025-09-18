
import type { Operator } from '../../types';

const isDurationalSequence = (list: any): list is any[] => {
    if (!Array.isArray(list)) return false;
    if (list.length === 0) return true;
    const first = list[0];
    return Array.isArray(first) && (first.length === 2 || first.length === 3);
};

export const quantise: Operator = {
    definition: {
        exec: function*(s) {
            const step = s.pop() as number;
            const list = s.pop();

            if (typeof step !== 'number' || step <= 0) {
                throw new Error('quantise expects a positive number for the quantization step.');
            }
            if (!isDurationalSequence(list)) {
                throw new Error('quantise expects a durational sequence from `dur`.');
            }

            const quantizedList = list.map(item => {
                const [note, duration, lyric] = item;
                const newDuration = Math.round(duration / step) * step;
                const newItem = [note, newDuration];
                if (lyric !== undefined) {
                    newItem.push(lyric);
                }
                return newItem;
            });
            
            s.push(quantizedList);
        },
        description: `Quantizes the durations in a sequence to the nearest multiple of a given step duration. For example, using a step of \`0.125\` (an eighth note) will align all note durations to the eighth note grid.`,
        effect: `[L_dur_sequence N_step] -> [L_quantized_sequence]`
    },
    examples: [
        {
            code: '(60 0.2 62 0.3) dur 0.125 quantise', // Quantize to nearest 8th note
            assert: s => {
                const res = s[0];
                return res.length === 2 && res[0][1] === 0.25 && res[1][1] === 0.25;
            },
            expectedDescription: 'A sequence with durations quantized to the nearest 0.125.'
        }
    ]
};
