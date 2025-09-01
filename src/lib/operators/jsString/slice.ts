import type { Operator } from '../../types';

export const slice: Operator = {
    definition: {
        exec: function*(s) { 
            const end = s.pop() as number;
            const start = s.pop() as number;
            const str = s.pop() as string;
            s.push(str.slice(start, end)); 
        },
        description: 'Extracts a section of a string and returns it as a new string. `S Start End -> S`',
        effect: '[S I_start I_end] -> [S\']'
    },
    examples: [
        { code: '"hello world" 0 5 slice', expected: ["hello"] },
        { code: '"hello world" 6 11 slice', expected: ["world"] },
        { code: '"abc" 1 1 slice', expected: [""] },
    ]
};