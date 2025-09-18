import type { Operator } from '../../types';

export const rat: Operator = {
    definition: {
        exec: function*(s) {
            const denominator = s.pop() as number;
            const numerator = s.pop() as number;
            if (typeof numerator !== 'number' || typeof denominator !== 'number') {
                throw new Error('rat requires two numbers (numerator denominator).');
            }
            if (denominator === 0) {
                throw new Error('Ratio denominator cannot be zero.');
            }
            const cents = 1200 * Math.log2(numerator / denominator);
            s.push(cents);
        },
        description: 'Converts a fractional ratio (Numerator Denominator) into a cents value relative to the unison (1/1 ratio).',
        effect: `[N_num N_den] -> [N_cents]`
    },
    examples: [
        {
            code: '3 2 rat', // Perfect Fifth
            assert: s => Math.abs(s[0] - 701.955) < 1e-3
        },
        {
            code: '5 4 rat', // Major Third
            assert: s => Math.abs(s[0] - 386.313) < 1e-3
        },
        {
            code: '1 2 rat', // Octave down
            expected: [-1200]
        }
    ]
};
