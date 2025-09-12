
import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const arc2d: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                rb: s.pop(),
                ra: s.pop(),
                sc: s.pop(),
            };
            s.push(createMarchingObject('arc2d', 'geometry', [], properties));
        },
        description: `Creates a 2D arc geometry (extruded).`,
        effect: `[sc ra rb] -> [sdf]`
    },
    examples: [{
        code: `0.866 0.5 vec2 0.5 0.1 arc2d randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `
# Animate the start/end angles of the arc
(t sin) glsl (t cos) glsl vec2
# Animate the radii
(t 0.5 * sin 0.2 * 0.4 +) glsl
(t 0.5 * cos 0.1 * 0.1 +) glsl
arc2d
1.0 1.2 1.4 wavecolor material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a colorful, animated arc.'
    }]
};