import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const segment2d: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                b: s.pop(),
                a: s.pop()
            };
            s.push(createMarchingObject('segment2d', 'geometry', [], properties));
        },
        description: `Creates a 2D line segment geometry (extruded plane).`,
        effect: `[a b] -> [sdf]`
    },
    examples: [{
        code: `-0.5 0 vec2 0.5 0 vec2 segment2d 0.1 round randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `
# Animate the endpoints of the line segment
(t sin -0.5 *) glsl 0 vec2
(t sin 0.5 *) glsl 0 vec2
segment2d
0.1 round
1.0 1.2 1.4 wavecolor material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering an animated, rounded line segment.'
    }]
};