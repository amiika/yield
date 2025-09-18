
import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const invertrow: Operator = {
    definition: {
        exec: function*(s) {
            const top = s.pop();
            let row: number[];
            let axis: number;
            
            if (Array.isArray(top) && !isMatrix(top)) { // Axis is optional, default to first note
                row = top;
                if(row.length === 0) {
                    s.push(row);
                    return;
                }
                if(typeof row[0] !== 'number') {
                    s.push(row);
                    throw new Error('Cannot determine axis: first element of row is not a number.');
                }
                axis = row[0];
            } else if (typeof top === 'number') { // Axis provided
                axis = top;
                const next = s.pop();
                if(!Array.isArray(next) || isMatrix(next)) throw new Error('invertrow expects a tone row (list) before the axis number.');
                row = next;
            } else {
                 throw new Error('invertrow expects a tone row, optionally followed by an axis number.');
            }

            const invertedRow = row.map(pc => {
                if (typeof pc !== 'number') return pc;
                const newPc = (2 * axis - pc) % 12;
                return newPc < 0 ? newPc + 12 : newPc;
            });
            s.push(invertedRow);
        },
        description: 'Inverts a tone row around an axis. If no axis is provided, it inverts around the first note of the row. Inversion is calculated as `(2 * axis - pitch_class) mod 12`.',
        effect: `[L_row N_axis?] -> [L_invertedRow]`
    },
    examples: [
        { code: '(0 1 2 3) invertrow', expected: [[0, 11, 10, 9]] },
        { code: '(0 1 2 3) 0 invertrow', expected: [[0, 11, 10, 9]] },
        { code: '(3 4 5) 6 invertrow', expected: [[9, 8, 7]] },
    ]
};
