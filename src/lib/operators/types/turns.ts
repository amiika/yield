
import type { Operator } from '../../types';

export const turns: Operator = {
    definition: {
        exec: function*(s) {
            const t = s.pop() as number;
            if (typeof t !== 'number') {
                throw new Error('turns expects a number.');
            }
            s.push(t * 2 * Math.PI);
        },
        description: 'Converts an angle from turns (where 1 turn = 360°) to radians.',
        effect: '[turns] -> [radians]'
    },
    examples: [
        { code: '1 turns', expected: [2 * Math.PI] },
        { code: '0.5 turns', expected: [Math.PI] },
    ]
};
