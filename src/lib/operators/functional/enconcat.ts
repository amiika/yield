import type { Operator } from '../../types';

export const enconcat: Operator = {
    definition: {
        exec: function*(s) { 
            const e = s.pop(); 
            const l2 = s.pop(); 
            const l1 = s.pop();
            if (!Array.isArray(l1) || !Array.isArray(l2)) throw new Error('enconcat expects two lists');
            s.push([...l1, e, ...l2]); 
        },
        description: 'Concatenates two sequences with an element inserted between them. `S T X -> U`',
        example: '[1 2] [3 4] 0 enconcat',
        effect: '[L1 L2 E] -> [L3]'
    },
    testCases: [
        { code: '[1 2] [3 4] 0 enconcat', expected: [[1, 2, 0, 3, 4]] },
        { code: '["a"] ["b"] "-" enconcat', expected: [["a", "-", "b"]] },
    ]
};