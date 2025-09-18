
import type { Operator } from '../../types';

export const scalegen: Operator = {
    definition: {
        exec: function*(s) {
            const period = s.pop() as number;
            const steps = s.pop() as number;
            const generator = s.pop() as number;

            if (typeof generator !== 'number' || typeof steps !== 'number' || typeof period !== 'number' || !Number.isInteger(steps) || steps < 1) {
                throw new Error('scalegen expects a generator (cents), number of steps (integer), and a period (cents).');
            }

            const scale: number[] = [];
            // To generate diatonic-like scales (Pythagorean, Meantone), we need to stack
            // the generator both up and down from the tonic.
            const stepsUp = Math.ceil((steps - 1) / 2);
            const stepsDown = Math.floor((steps - 1) / 2);

            scale.push(0.0); // Tonic

            // Stack upwards
            for (let i = 1; i <= stepsUp; i++) {
                scale.push(i * generator);
            }
            
            // Stack downwards
            for (let i = 1; i <= stepsDown; i++) {
                scale.push(-i * generator);
            }

            // Fold all notes into the period (e.g., a single octave)
            const foldedScale = scale.map(note => {
                let folded = note % period;
                if (folded < 0) folded += period;
                return folded;
            });
            
            const uniqueSorted = [...new Set(foldedScale)].sort((a, b) => a - b);
            
            // Round to 2 decimal places to handle floating point inaccuracies and match test expectations.
            const roundedScale = uniqueSorted.map(val => Math.round(val * 100) / 100);
            
            s.push(roundedScale);
        },
        description: `Generates a scale by repeatedly stacking a generator interval. It consumes a generator (in cents), a number of steps, and a period (usually 1200 cents for an octave). The resulting scale is a sorted list of cents values with duplicates removed.`,
        effect: `[N_generator N_steps N_period] -> [L_cents]`
    },
    examples: [
        {
            code: `# Pythagorean tuning (stacking perfect fifths)
701.955 12 1200 scalegen`,
            assert: s => {
                const res = s[0];
                const expected = [0, 90.22, 203.91, 294.13, 407.82, 498.04, 611.73, 701.95, 792.18, 905.86, 996.09, 1109.78];
                if (!Array.isArray(res) || res.length !== 12) return false;
                return res.every((val, i) => Math.abs(val - expected[i]) < 1e-2);
            },
            expectedDescription: 'A 12-note Pythagorean scale in cents.'
        },
        {
            code: `# 5-note Meantone scale
696.578 5 1200 scalegen`,
            assert: s => {
                const res = s[0];
                const expected = [0, 193.16, 503.42, 696.58, 1006.84];
                if (!Array.isArray(res) || res.length !== 5) return false;
                return res.every((val, i) => Math.abs(val - expected[i]) < 1e-2);
            },
             expectedDescription: 'A 5-note meantone scale in cents.'
        }
    ]
};