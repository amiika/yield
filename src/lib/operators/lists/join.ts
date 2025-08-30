import type { Operator } from '../../types';

export const join: Operator = {
    definition: {
        exec: function*(s) {
            const l = s.pop();
            if (!Array.isArray(l)) throw new Error('join expects a list');
            s.push(l.join(''));
        },
        description: 'Joins a list of strings into a single string.',
        example: '["hello" " " "world"] join',
        effect: '[[S1 S2]] -> [S]'
    },
    testCases: [
        { code: '["hello" " " "world"] join', expected: ["hello world"] },
        { code: '["a" "b" "c"] join', expected: ["abc"] },
        { code: '[] join', expected: [""] },
    ]
};
