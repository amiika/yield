import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const transposepcs: Operator = {
    definition: {
        exec: function*(s) {
            const offset = s.pop() as number;
            const row = s.pop();

            if (typeof offset !== 'number') {
                throw new Error('transposepcs expects a number for the offset.');
            }
            if (!Array.isArray(row) || isMatrix(row)) {
                throw new Error('transposepcs expects a list of numbers (a tone row).');
            }

            const transposedRow = row.map(pc => {
                if (typeof pc !== 'number') return pc; // pass through non-numbers
                const newPc = (pc + offset) % 12;
                return newPc < 0 ? newPc + 12 : newPc;
            });

            s.push(transposedRow);
        },
        description: 'Transposes a tone row (a list of pitch classes) by a given interval in semitones. The transposition is performed modulo 12.',
        effect: `[L_row N_offset] -> [L_transposedRow]`
    },
    examples: [
        { code: '(0 1 2 3) 5 transposepcs', expected: [[5, 6, 7, 8]] },
        { code: '(7 8 9 10) 5 transposepcs', expected: [[0, 1, 2, 3]] },
        { code: '(0 11 7 8) -2 transposepcs', expected: [[10, 9, 5, 6]] },
    ]
};