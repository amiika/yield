
import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const triangle2d: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                p2: s.pop(),
                p1: s.pop(),
                p0: s.pop(),
            };
            s.push(createMarchingObject('triangle2d', 'geometry', [], properties));
        },
        description: `Creates a 2D triangle geometry from three points (extruded).`,
        effect: `[p0 p1 p2] -> [sdf]`
    },
    examples: [{
        code: `0.5 -0.5 vec2 -0.5 -0.5 vec2 0.0 0.5 vec2 triangle2d randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `
# Animate one vertex of the triangle
(t sin 0.5 *) glsl 0.0 vec2
-0.5 -0.5 vec2
0.5 -0.5 vec2
triangle2d
"orange" material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering an animated 2D triangle.'
    }]
};