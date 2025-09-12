
import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const roundedbox2d: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                radii: s.pop(),
                size: s.pop(),
            };
            s.push(createMarchingObject('roundedbox2d', 'geometry', [], properties));
        },
        description: `Creates a 2D rounded box geometry (extruded). Radii are specified as a vec4 for top-right, bottom-right, top-left, bottom-left corners.`,
        effect: `[size radii] -> [sdf]`
    },
    examples: [{
        code: `0.5 0.8 vec2 0.1 0.2 0.3 0.4 vec4 roundedbox2d randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `
# Animate the box size
0.5 0.8 vec2
# Animate the corner radii
(t 0.5 * sin 0.1 * 0.4 +) glsl
(t 0.5 * cos 0.1 * 0.4 +) glsl
(t 0.5 * sin 0.1 * 0.4 +) glsl
(t 0.5 * cos 0.1 * 0.4 +) glsl
vec4 roundedbox2d
1.0 1.2 1.4 wavecolor material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a 2D rounded box with animated corner radii.'
    }]
};