import type { Operator } from '../../types';

export const xor: Operator = {
    definition: {
        exec: function*(s) { 
            const b = s.pop(), a = s.pop();
            if (a instanceof Set && b instanceof Set) {
                const diff1 = [...a].filter(x => !b.has(x));
                const diff2 = [...b].filter(x => !a.has(x));
                s.push(new Set([...diff1, ...diff2]));
            } else {
                s.push(!!(a ^ b)); 
            }
        },
        description: 'Logical XOR. Pops A and B, pushes A ^ B. If both A and B are sets, it pushes their symmetric difference.',
        example: 'true true xor\n{1 2} {2 3} xor',
        effect: '[A B] -> [C]'
    },
    testCases: [
        { code: 'true false xor', expected: [true] },
        { code: 'true true xor', expected: [false] },
        { code: '1 0 xor', expected: [true] },
        { code: '{1 2} {2 3} xor', expected: [new Set([1, 3])] }
    ]
};