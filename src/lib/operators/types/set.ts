import type { Operator } from '../../types';

export const set: Operator = {
    definition: {
        exec: function*(s) {
            const list = s.pop();
            if (!Array.isArray(list)) throw new Error('set expects a list.');
            // Create a list with unique values
            s.push([...new Set(list)]);
        },
        description: 'Converts a list to a list with unique values.',
        effect: '[L] -> [L\']'
    },
    examples: [
        {
            code: '(1 2 2 3) set',
            expected: [[1, 2, 3]]
        }
    ]
};
