
import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const vesica2d: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                height: s.pop(),
                width: s.pop(),
            };
            s.push(createMarchingObject('vesica2d', 'geometry', [], properties));
        },
        description: `Creates a 2D vesica piscis geometry (extruded).`,
        effect: `[width height] -> [sdf]`
    },
    examples: [{
        code: `0.3 0.5 vesica2d randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `
# Animate the dimensions of the vesica
(t 0.5 * sin 0.2 * 0.5 +) glsl
(t 0.5 * cos 0.2 * 0.3 +) glsl
vesica2d
1.0 1.2 1.4 wavecolor material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering an animated 2D vesica piscis.'
    }]
};