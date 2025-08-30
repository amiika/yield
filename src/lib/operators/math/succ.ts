import type { Operator } from '../../types';

export const succ: Operator = {
    definition: {
        exec: function*(s) { s.push((s.pop() ?? 0) + 1); },
        description: 'Successor. Adds 1 to the top element.',
        example: '10 succ',
        effect: '[N] -> [N+1]'
    },
    testCases: [
        { code: '10 succ', expected: [11] },
        { code: '-1 succ', expected: [0] },
        { code: 'succ', expected: [1] }
    ]
};