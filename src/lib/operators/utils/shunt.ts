import type { Operator } from '../../types';

export const shunt: Operator = {
    definition: {
        exec: function*(s) { 
            const l2 = s.pop();
            const l1 = s.pop();
            if (!Array.isArray(l1) || !Array.isArray(l2)) throw new Error('shunt expects two lists on the stack.');

            // Create a reversed copy of l2 to avoid mutating it, then prepend to l1
            const reversedL2 = [...l2].reverse();
            l1.unshift(...reversedL2);
            s.push(l1);
        },
        description: 'Moves all elements from list L2, in reverse order, to the front of list L1.',
        effect: '[L1 L2] -> [L3]'
    },
    examples: [
        { code: '(1 2 3) (4 5 6) shunt', expected: [[6, 5, 4, 1, 2, 3]] },
        { code: '() (1 2) shunt', expected: [[2, 1]] },
    ]
};
