import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const ellipse2d: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                size: s.pop()
            };
            s.push(createMarchingObject('ellipse2d', 'geometry', [], properties));
        },
        description: `Creates a 2D ellipse geometry (extruded).`,
        effect: `[size] -> [sdf]`
    },
    examples: [{
        code: `0.5 0.2 vec2 ellipse2d randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `
# Animate the ellipse's radii
(t 0.5 * sin 0.2 * 0.5 +) glsl
(t 0.5 * cos 0.2 * 0.2 +) glsl
vec2 ellipse2d
"magenta" material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering an animated, pulsating 2D ellipse.'
    }]
};