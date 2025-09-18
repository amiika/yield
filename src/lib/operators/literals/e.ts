
import type { Operator } from '../../types';

export const euler: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.E); },
        description: "Pushes Euler's number (e ≈ 2.71828).",
        effect: '-> [F]'
    },
    examples: [
        { code: 'euler', expected: [Math.E] },
        { code: 'ℯ', expected: [Math.E] }
    ]
};
