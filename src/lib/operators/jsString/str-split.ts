import type { Operator } from '../../types';

export const splitstr: Operator = {
    definition: {
        exec: function*(s) { 
            const separator = s.pop() as string;
            const str = s.pop() as string;
            s.push(str.split(separator)); 
        },
        description: 'Splits a string into a list of substrings. `S Separator -> [S1 S2 ...]`',
        effect: '[S Separator] -> [L]'
    },
    examples: [
        { code: '"a,b,c" "," splitstr', expected: [['a', 'b', 'c']] },
        { code: '"hello" "" splitstr', expected: [['h', 'e', 'l', 'l', 'o']] },
        { code: '"a b" " " splitstr', expected: [['a', 'b']] },
    ]
};