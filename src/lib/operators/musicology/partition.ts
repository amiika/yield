import type { Operator } from '../../types';

export const partition: Operator = {
    definition: {
        exec: function*(s) {
            const size = s.pop() as number;
            const list = s.pop();

            if (typeof size !== 'number' || !Number.isInteger(size) || size <= 0) {
                throw new Error('partition expects a positive integer size.');
            }
            if (!Array.isArray(list)) {
                throw new Error('partition expects a list to operate on.');
            }

            const result = [];
            for (let i = 0; i < list.length; i += size) {
                result.push(list.slice(i, i + size));
            }
            s.push(result);
        },
        description: 'Partitions a list into a list of smaller lists of a given size.',
        effect: '[L_list N_size] -> [L_of_lists]'
    },
    examples: [
        { code: '(0 1 2 3 4 5) 3 partition', expected: [[[0, 1, 2], [3, 4, 5]]] },
        { code: '(0 1 2 3 4 5) 2 partition', expected: [[[0, 1], [2, 3], [4, 5]]] },
        { code: '(0 1 2 3 4) 3 partition', expected: [[[0, 1, 2], [3, 4]]] },
        { code: '() 3 partition', expected: [[]] },
    ]
};
