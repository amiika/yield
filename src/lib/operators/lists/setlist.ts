import type { Operator } from '../../types';

export const setlist: Operator = {
    definition: {
        exec: function*(s) {
            const list = s.pop();
            if (!Array.isArray(list)) throw new Error('setlist expects a list.');
            s.push([...new Set(list)]);
        },
        description: 'Removes duplicate elements from a list.',
        effect: '[L] -> [L\']'
    },
    examples: [
        {
            code: '(1 2 2 3) setlist',
            expected: [[1, 2, 3]]
        },
        {
            code: '("c" "a" "b" "a") setlist',
            expected: [["c", "a", "b"]]
        }
    ]
};