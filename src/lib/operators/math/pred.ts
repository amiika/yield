import type { Operator } from '../../types';

export const pred: Operator = {
    definition: {
        exec: function*(s) { s.push((s.pop() ?? 0) - 1); },
        description: 'Predecessor. Subtracts 1 from the top element.',
        example: '10 pred',
        effect: '[N] -> [N-1]'
    },
    testCases: [
        { code: '10 pred', expected: [9] },
        { code: '0 pred', expected: [-1] },
        { code: 'pred', expected: [-1] }
    ]
};