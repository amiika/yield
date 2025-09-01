import type { Operator } from '../../types';

export const join: Operator = {
    definition: {
        exec: function*(s) {
            const l = s.pop();
            if (!Array.isArray(l)) throw new Error('join expects a list');
            s.push(l.join(''));
        },
        description: 'Joins a list of strings into a single string.',
        effect: '[[S1 S2]] -> [S]'
    },
    examples: [
        { code: '["hello" " " "world"] join', expected: ["hello world"] },
        { code: '["a" "b" "c"] join', expected: ["abc"] },
        { code: '[] join', expected: [""] },
    ]
};