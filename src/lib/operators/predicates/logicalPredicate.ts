import type { Operator } from '../../types';

export const logicalPredicate: Operator = {
    definition: {
        exec: function*(s) {
            const v = s.pop();
            s.push(typeof v === 'boolean');
        },
        description: 'Tests if the top element is a boolean (`true` or `false`).',
        effect: '[A] -> [bool]'
    },
    examples: [
        { code: 'true logical?', expected: [true] },
        { code: 'false logical?', expected: [true] },
        { code: '1 logical?', expected: [false] },
        { code: '"true" logical?', expected: [false] },
        { code: '[] logical?', expected: [false] }
    ]
};
