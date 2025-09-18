import type { Operator } from '../../types';

export const harmonics: Operator = {
    definition: {
        exec: function*(s) {
            const count = s.pop() as number;
            if (typeof count !== 'number' || !Number.isInteger(count) || count < 1) {
                throw new Error('harmonics operator expects a positive integer count.');
            }

            const centsList: number[] = [];
            for (let i = 1; i <= count; i++) {
                // The i-th partial is the ratio i/1
                const cents = 1200 * Math.log2(i);
                centsList.push(cents);
            }
            s.push(centsList);
        },
        description: `Generates the first N partials of the harmonic series as a list of cents relative to the fundamental. The list includes the fundamental (0 cents).`,
        effect: `[N_count] -> [L_cents]`
    },
    examples: [
        {
            code: '8 harmonics',
            assert: s => {
                const res = s[0];
                const expected = [0, 1200, 1901.95, 2400, 2786.31, 3101.95, 3368.82, 3600];
                if (!Array.isArray(res) || res.length !== 8) return false;
                return res.every((val, i) => Math.abs(val - expected[i]) < 1e-2);
            },
            expectedDescription: 'A list of the first 8 partials in cents: [0, 1200, 1901.95...]'
        },
        {
            code: '1 harmonics',
            expected: [[0]]
        }
    ]
};
