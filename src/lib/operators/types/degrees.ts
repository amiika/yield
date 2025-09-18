
import type { Operator } from '../../types';

export const degrees: Operator = {
    definition: {
        exec: function*(s) {
            const deg = s.pop() as number;
            if (typeof deg !== 'number') {
                throw new Error('degrees expects a number.');
            }
            s.push(deg * (Math.PI / 180));
        },
        description: 'Converts an angle from degrees to radians.',
        effect: '[degrees] -> [radians]'
    },
    examples: [
        { code: '180 degrees', expected: [Math.PI] },
        { code: '90 degrees', expected: [Math.PI / 2] },
    ]
};
