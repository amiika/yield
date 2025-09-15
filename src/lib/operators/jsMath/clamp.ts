
import type { Operator } from '../../types';

export const clamp: Operator = {
    definition: {
        exec: function*(s) {
            const c = s.pop(); // max
            const b = s.pop(); // min
            const a = s.pop(); // value
            if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number') {
                throw new Error('clamp requires three numbers: value, min, max.');
            }
            s.push(Math.max(b, Math.min(c, a)));
        },
        description: 'Clamps a value between a min and max. RPN: `val min max clamp`',
        effect: '[N N N] -> [N]'
    },
    examples: [
        { code: '5 0 10 clamp', expected: [5] },
        { code: '15 0 10 clamp', expected: [10] },
        { code: '-5 0 10 clamp', expected: [0] }
    ]
};
