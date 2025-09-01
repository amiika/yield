import type { Operator } from '../../types';

export const and: Operator = {
    definition: {
        exec: function*(s) { 
            const b = s.pop(), a = s.pop(); 
            if (a instanceof Set && b instanceof Set) {
                s.push(new Set([...a].filter(x => b.has(x))));
            } else {
                s.push(a && b); 
            }
        },
        description: 'Logical AND. Pops A and B, pushes A && B. If both A and B are sets, it pushes their intersection.',
        effect: '[A B] -> [C]'
    },
    examples: [
        { code: 'true true and', expected: [true] },
        { code: 'true false and', expected: [false] },
        { code: '1 0 and', expected: [0] },
        { code: '{1 2} {2 3} and', expected: [new Set([2])] }
    ]
};