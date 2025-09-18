import type { Operator } from '../../types';

export const retrograde: Operator = {
    definition: {
        exec: function*(s) { 
            const val = s.pop();
            if (Array.isArray(val)) {
                s.push([...val].reverse());
            } else {
                throw new Error('retrograde expects a list (tone row).');
            }
        },
        description: 'Reverses a tone row. This is the retrograde transformation in twelve-tone music. It is a non-mutating version of `reverse`, restricted to lists.',
        effect: '[L_row] -> [L_retrogradeRow]'
    },
    examples: [
        { code: '(0 11 7 8) retrograde', expected: [[8, 7, 11, 0]] },
        { code: '() retrograde', expected: [[]] },
    ]
};
