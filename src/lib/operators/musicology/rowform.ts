import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

const invertRow = (row: number[], axis: number): number[] => {
    return row.map(pc => {
        const newPc = (2 * axis - pc) % 12;
        return newPc < 0 ? newPc + 12 : newPc;
    });
};
const transposeRow = (row: number[], offset: number): number[] => {
    return row.map(pc => {
        const newPc = (pc + offset) % 12;
        return newPc < 0 ? newPc + 12 : newPc;
    });
};

export const rowform: Operator = {
    definition: {
        exec: function*(s) {
            const opStr = s.pop() as string;
            const row = s.pop();

            if (typeof opStr !== 'string') throw new Error('rowform expects an operation string (e.g., "p5", "ri11").');
            if (!Array.isArray(row) || isMatrix(row)) throw new Error('rowform expects a list (tone row).');
            if (row.some(pc => typeof pc !== 'number')) throw new Error('Tone row must contain only numbers.');

            const match = opStr.toLowerCase().match(/^(p|i|r|ri)(\d+)$/);
            if (!match) throw new Error(`Invalid row form string: '${opStr}'.`);
            
            const [, form, transposeLevelStr] = match;
            const transposeLevel = parseInt(transposeLevelStr, 10);

            let transformedRow = [...row];

            if (form.includes('i')) {
                const axis = row[0]; // Invert around the first note
                transformedRow = invertRow(transformedRow, axis);
            }
            if (form.includes('r')) {
                transformedRow.reverse();
            }

            transformedRow = transposeRow(transformedRow, transposeLevel);

            s.push(transformedRow);
        },
        description: 'A twelve-tone row operator that generates a transformed row form. It consumes a row and an operation string (e.g., "p0", "i5", "r6", "ri11"). P=Prime, I=Inversion, R=Retrograde, RI=Retrograde-Inversion. The number indicates the transposition level in semitones.',
        effect: `[L_row S_op] -> [L_newRow]`
    },
    examples: [
        { code: '(0 11 7 8) "p0" rowform', expected: [[0, 11, 7, 8]] },
        { code: '(0 11 7 8) "p5" rowform', expected: [[5, 4, 0, 1]] },
        { code: '(0 11 7 8) "i0" rowform', expected: [[0, 1, 5, 4]] },
        { code: '(0 11 7 8) "i5" rowform', expected: [[5, 6, 10, 9]] },
        { code: '(0 11 7 8) "r0" rowform', expected: [[8, 7, 11, 0]] },
        { code: '(0 11 7 8) "ri5" rowform', expected: [[9, 10, 6, 5]] },
    ]
};