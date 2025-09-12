
import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const octogon2d: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                radius: s.pop()
            };
            s.push(createMarchingObject('octogon2d', 'geometry', [], properties));
        },
        description: `Creates a 2D octogon geometry (extruded).`,
        effect: `[radius] -> [sdf]`
    },
    examples: [{
        code: `0.5 octogon2d randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `
# Animate the radius of the octogon
(t 0.5 * sin 0.5 * 0.8 +) glsl
octogon2d
:orange material
(t) glsl 0 0 1 vec3 rotatesdf
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a rotating, pulsating 2D octogon.'
    }]
};
