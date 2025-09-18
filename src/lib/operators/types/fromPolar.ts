
import type { Operator } from '../../types';

export const fromPolar: Operator = {
    definition: {
        exec: function*(s) {
            const coords = s.pop() as [number, number];
            if (!Array.isArray(coords) || coords.length !== 2 || typeof coords[0] !== 'number' || typeof coords[1] !== 'number') {
                throw new Error('fromPolar expects a list of two numbers [r, theta].');
            }
            const [r, theta] = coords;
            const x = r * Math.cos(theta);
            const y = r * Math.sin(theta);
            s.push([x, y]);
        },
        description: 'Converts polar coordinates `[r, theta]` to Cartesian coordinates `[x, y]`.',
        effect: '[[r, theta]] -> [[x, y]]'
    },
    examples: [
        { code: '(1 0) fromPolar', assert: s => s.length === 1 && Array.isArray(s[0]) && Math.abs(s[0][0] - 1) < 1e-9 && Math.abs(s[0][1] - 0) < 1e-9 },
        { code: '(1 1.57079632679) fromPolar', assert: s => s.length === 1 && Array.isArray(s[0]) && Math.abs(s[0][0] - 0) < 1e-9 && Math.abs(s[0][1] - 1) < 1e-9 },
    ]
};
