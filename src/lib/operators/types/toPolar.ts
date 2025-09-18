
import type { Operator } from '../../types';

export const toPolar: Operator = {
    definition: {
        exec: function*(s) {
            const coords = s.pop() as [number, number];
            if (!Array.isArray(coords) || coords.length !== 2 || typeof coords[0] !== 'number' || typeof coords[1] !== 'number') {
                throw new Error('toPolar expects a list of two numbers [x, y].');
            }
            const [x, y] = coords;
            const r = Math.hypot(x, y);
            const theta = Math.atan2(y, x);
            s.push([r, theta]);
        },
        description: 'Converts Cartesian coordinates `[x, y]` to polar coordinates `[r, theta]`.',
        effect: '[[x, y]] -> [[r, theta]]'
    },
    examples: [
        { code: '(1 0) toPolar', assert: s => s.length === 1 && Array.isArray(s[0]) && s[0][0] === 1 && s[0][1] === 0 },
        { code: '(0 1) toPolar', assert: s => s.length === 1 && Array.isArray(s[0]) && s[0][0] === 1 && Math.abs(s[0][1] - Math.PI / 2) < 1e-9 },
    ]
};
