import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const roundedx2d: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                radius: s.pop(),
                width: s.pop(),
            };
            s.push(createMarchingObject('roundedx2d', 'geometry', [], properties));
        },
        description: `Creates a 2D rounded X geometry (extruded).`,
        effect: `[width radius] -> [sdf]`
    },
    examples: [{
        code: `0.5 0.1 roundedx2d randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `
# Animate the width and radius
(t 0.5 * sin 0.2 * 0.5 +) glsl
(t 0.5 * cos 0.1 * 0.2 +) glsl
roundedx2d
1.0 1.2 1.4 wavecolor material
(t) glsl 0 0 1 vec3 rotatesdf
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a rotating, animated 2D rounded X.'
    }]
};