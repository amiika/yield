import type { Operator } from '../../types';

export const edo: Operator = {
    definition: {
        exec: function*(s) {
            const divisions = s.pop() as number;
            const step = s.pop() as number;
            if (typeof step !== 'number' || typeof divisions !== 'number') {
                throw new Error('edo requires two numbers (step divisions).');
            }
            if (divisions === 0) {
                throw new Error('EDO divisions cannot be zero.');
            }
            const cents = (step / divisions) * 1200;
            s.push(cents);
        },
        description: 'Converts an Equal Divisions of the Octave (EDO) step into a cents value.',
        effect: `[N_step N_divisions] -> [N_cents]`
    },
    examples: [
        {
            code: '7 12 edo', // A perfect fifth in 12-TET
            expected: [700]
        },
        {
            code: '1 24 edo', // A quarter-tone
            expected: [50]
        },
        {
            code: '19 31 edo', // A step in 31-EDO
            assert: s => Math.abs(s[0] - 735.483) < 1e-3
        }
    ]
};
