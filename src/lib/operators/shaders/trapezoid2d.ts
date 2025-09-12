
import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const trapezoid2d: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                height: s.pop(),
                r2: s.pop(),
                r1: s.pop(),
            };
            s.push(createMarchingObject('trapezoid2d', 'geometry', [], properties));
        },
        description: `Creates a 2D isosceles trapezoid geometry (extruded).`,
        effect: `[r1 r2 height] -> [sdf]`
    },
    examples: [{
        code: `0.3 0.2 0.5 trapezoid2d randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `
# Animate the radii of the trapezoid
(t 0.5 * sin 0.2 * 0.5 +) glsl
(t 0.5 * cos 0.2 * 0.2 +) glsl
0.3 trapezoid2d
1.0 1.2 1.4 wavecolor material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering an animated 2D trapezoid.'
    }]
};