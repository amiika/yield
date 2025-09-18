import type { Operator } from '../../types';

const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string';

export const jit: Operator = {
    definition: {
        exec: function*(s) {
            const denominator = s.pop() as number;
            const numerator = s.pop() as number;
            const rootHzOrQuotation = s.pop();

            if (typeof numerator !== 'number' || typeof denominator !== 'number' || denominator === 0) {
                throw new Error('jit expects two numbers for the ratio (numerator denominator).');
            }
            if (typeof rootHzOrQuotation !== 'number' && !isAudioQuotation(rootHzOrQuotation) && !Array.isArray(rootHzOrQuotation)) {
                throw new Error('jit expects a root frequency (number), a list of frequencies, or an audio quotation.');
            }
            
            const ratio = numerator / denominator;

            if (typeof rootHzOrQuotation === 'number') {
                s.push(rootHzOrQuotation * ratio);
            } else if (isAudioQuotation(rootHzOrQuotation)) {
                // It's an audio quotation. We need to multiply it by the ratio.
                s.push([rootHzOrQuotation, ratio, 'mul']);
            } else if (Array.isArray(rootHzOrQuotation)) {
                const result = rootHzOrQuotation.map(val => typeof val === 'number' ? val * ratio : val);
                s.push(result);
            }
        },
        description: `An audio utility for just intonation. It multiplies a root frequency by a fractional ratio to produce a new frequency. The root can be a static number, a list of frequencies (for chords), or an audio quotation (frequency stream), allowing for dynamic pitch shifting.`,
        effect: `[F_rootHz|L_quotation N_num N_den] -> [F_newHz|L_quotation]`
    },
    examples: [
        {
            code: '440 3 2 jit', // A perfect fifth above A4
            expected: [660]
        },
        {
            code: '440 sine 5 4 jit 0.5 mul 0.5 play',
            expected: [],
            expectedDescription: 'Plays a just major third above a 440Hz sine wave.'
        },
        {
            code: '(440 660) 9 8 jit', // A major second above the chord
            assert: s => Array.isArray(s[0]) && Math.abs(s[0][0] - 495) < 1e-4 && Math.abs(s[0][1] - 742.5) < 1e-4,
            expectedDescription: 'Applies the ratio to each note in a chord.'
        }
    ]
};