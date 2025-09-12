
import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const pentagon2d: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                radius: s.pop()
            };
            s.push(createMarchingObject('pentagon2d', 'geometry', [], properties));
        },
        description: `Creates a 2D pentagon geometry (extruded).`,
        effect: `[radius] -> [sdf]`
    },
    examples: [{
        code: `0.5 pentagon2d randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `
# Animate the radius of the pentagon
(t 0.5 * sin 0.5 * 0.8 +) glsl
pentagon2d
:purple material
(t) glsl 0 0 1 vec3 rotatesdf
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a rotating, pulsating 2D pentagon.'
    }]
};
