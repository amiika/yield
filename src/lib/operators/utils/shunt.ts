import type { Operator } from '../../types';

export const shunt: Operator = {
    definition: {
        exec: function*(s) { let l2 = s.pop(), l1 = s.pop(); for(const item of l2.reverse()) l1.unshift(item); s.push(l1); },
        description: 'Moves all elements from list L2 to the front of list L1.',
        example: '[1 2] [3 4] shunt',
        effect: '[L1 L2] -> [L3]'
    },
    testCases: [
        { code: '[1 2] [3 4] shunt', expected: [[3, 4, 1, 2]] },
        { code: '[] [1 2] shunt', expected: [[1, 2]] },
    ]
};