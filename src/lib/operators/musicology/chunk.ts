
import type { Operator, EvaluateFn } from '../../types';

const isDurationalSequence = (list: any): list is any[] => {
    if (!Array.isArray(list)) return false;
    if (list.length === 0) return true;
    const first = list[0];
    return Array.isArray(first) && (first.length === 2 || first.length === 3);
};

export const chunk: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const quotation = s.pop();
            const numChunks = s.pop() as number;
            const list = s.pop();

            if (typeof numChunks !== 'number' || !Number.isInteger(numChunks) || numChunks <= 0) {
                throw new Error('chunk expects a positive integer for the number of chunks.');
            }
            if (!Array.isArray(quotation)) {
                throw new Error('chunk expects a quotation.');
            }
            if (!isDurationalSequence(list)) {
                throw new Error('chunk expects a durational sequence from `dur`.');
            }

            if (list.length === 0) {
                s.push([]);
                return;
            }

            const chunkSize = Math.ceil(list.length / numChunks);
            const chunks = [];
            for (let i = 0; i < list.length; i += chunkSize) {
                chunks.push(list.slice(i, i + chunkSize));
            }

            const allResults = [];
            for (const c of chunks) {
                const tempStack = [c];
                yield* evaluate(quotation, tempStack, options);
                allResults.push(...tempStack);
            }
            
            s.push(allResults.flat());
        },
        description: `Splits a sequence into a number of equally-sized chunks (by event count), applies a function to each chunk, and joins the results back into a single sequence.`,
        effect: `[L_dur_sequence N_chunks [P]] -> [L_new_sequence]`
    },
    examples: [
        {
            code: '(60 q 62 q 64 q 65 q) dur 2 (2 ply) chunk',
            assert: s => s[0].length === 8 && s[0][0][1] === 0.125 && s[0][4][1] === 0.125,
            expectedDescription: 'A sequence where each half has been repeated with `ply`.'
        }
    ]
};
