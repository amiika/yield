
import type { Operator } from '../../types';

const isDurationalSequence = (list: any): list is any[] => {
    if (!Array.isArray(list)) return false;
    if (list.length === 0) return true;
    const first = list[0];
    return Array.isArray(first) && (first.length === 2 || first.length === 3);
};

export const scramble: Operator = {
    definition: {
        exec: function*(s) {
            const numChunks = s.pop() as number;
            const list = s.pop();
            
            if (typeof numChunks !== 'number' || !Number.isInteger(numChunks) || numChunks <= 0) {
                throw new Error('scramble expects a positive integer for the number of chunks.');
            }
            if (!isDurationalSequence(list)) {
                throw new Error('scramble expects a durational sequence from `dur`.');
            }

            if(list.length === 0) {
                s.push([]);
                return;
            }

            const chunkSize = Math.ceil(list.length / numChunks);
            const chunks = [];
            for (let i = 0; i < list.length; i += chunkSize) {
                chunks.push(list.slice(i, i + chunkSize));
            }

            const result = [];
            for (let i = 0; i < chunks.length; i++) {
                const randomIndex = Math.floor(Math.random() * chunks.length);
                result.push(...chunks[randomIndex]);
            }

            s.push(result);
        },
        description: `Divides a sequence into a number of parts by event count, then reassembles them by randomly sampling from the parts with replacement.`,
        effect: `[L_dur_sequence N_chunks] -> [L_scrambled_sequence]`
    },
    examples: [
        {
            code: '(60 q 62 q 64 q 65 q) dur 2 scramble',
            assert: s => s[0].length === 4,
            expectedDescription: 'A new 4-note sequence made of two randomly chosen halves of the original.'
        }
    ]
};
