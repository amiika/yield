
import type { Operator } from '../../types';

const isDurationalSequence = (list: any): list is any[] => {
    if (!Array.isArray(list)) return false;
    if (list.length === 0) return true;
    const first = list[0];
    return Array.isArray(first) && (first.length === 2 || first.length === 3);
};

export const shuffle: Operator = {
    definition: {
        exec: function*(s) {
            const numChunks = s.pop() as number;
            const list = s.pop();
            
            if (typeof numChunks !== 'number' || !Number.isInteger(numChunks) || numChunks <= 0) {
                throw new Error('shuffle expects a positive integer for the number of chunks.');
            }
            if (!isDurationalSequence(list)) {
                throw new Error('shuffle expects a durational sequence from `dur`.');
            }

            const chunkSize = Math.ceil(list.length / numChunks);
            const chunks = [];
            for (let i = 0; i < list.length; i += chunkSize) {
                chunks.push(list.slice(i, i + chunkSize));
            }

            // Fisher-Yates shuffle
            for (let i = chunks.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [chunks[i], chunks[j]] = [chunks[j], chunks[i]];
            }

            s.push(chunks.flat());
        },
        description: `Divides a sequence into a number of parts by event count, then shuffles those parts.`,
        effect: `[L_dur_sequence N_chunks] -> [L_shuffled_sequence]`
    },
    examples: [
        {
            code: '(60 q 62 q 64 q 65 q) dur 4 shuffle',
            assert: s => {
                const res = s[0];
                return res.length === 4 && res.map(i => i[0]).sort().join(',') === '60,62,64,65';
            },
            expectedDescription: 'A shuffled version of the original sequence.'
        }
    ]
};
