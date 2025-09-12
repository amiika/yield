import type { Operator } from '../../types';
import { deepClone } from '../../utils';

export const voices: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const programs = s.pop();
            const clock = s.pop();
            if (!Array.isArray(programs)) throw new Error('voices expects a list of programs.');
            // Clock can be any valid graph node, which is an array
            if (!Array.isArray(clock)) throw new Error('voices expects a clock signal graph.');

            const results = [];
            // Evaluate each voice on a temporary stack to isolate their effects from each other
            for (const program of programs) {
                const tempStack = [];
                // For each program, push a DEEP COPY of the clock, then evaluate the program.
                tempStack.push(deepClone(clock));
                yield* evaluate(program, tempStack, options);
                // Assume each voice program produces one audio graph result
                results.push(...tempStack);
            }
            // Push all collected results onto the main stack
            s.push(...results);
        },
        description: 'Applies a clock signal to multiple program quotations to generate multiple audio graphs (voices), leaving them on the stack.',
        effect: '[Clock [Prog1 Prog2 ...]] -> [Result1 Result2 ...]'
    },
    examples: [
        {
            code: `8 impulse ( (hh) (sd) (bd) ) voices`,
            assert: (s) => s.length === 3 && s.every(item => Array.isArray(item)),
            expectedDescription: 'Three audio graphs on the stack'
        }
    ]
};
