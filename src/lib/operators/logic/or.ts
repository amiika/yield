import type { Operator } from '../../types';

export const or: Operator = {
    definition: {
        exec: function*(s) { 
            const b = s.pop(), a = s.pop(); 
            if (a instanceof Set && b instanceof Set) {
                s.push(new Set([...a, ...b]));
            } else {
                s.push(a || b); 
            }
        },
        description: 'Logical OR. Pops A and B, pushes A || B. If both A and B are sets, it pushes their union.',
        effect: '[A B] -> [C]'
    },
    examples: [
        { code: 'true false or', expected: [true] },
        { code: 'false false or', expected: [false] },
        { code: '1 0 or', expected: [1] },
        { code: '{1 2} {2 3} or', expected: [new Set([1, 2, 3])] }
    ]
};