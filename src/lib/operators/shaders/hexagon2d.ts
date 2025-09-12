import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const hexagon2d: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                radius: s.pop()
            };
            s.push(createMarchingObject('hexagon2d', 'geometry', [], properties));
        },
        description: `Creates a 2D hexagon geometry (extruded).`,
        effect: `[radius] -> [sdf]`
    },
    examples: [{
        code: `0.5 hexagon2d randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `
# Animate the radius of the hexagon
(t 0.5 * sin 0.5 * 0.8 +) glsl
hexagon2d
(p x p y + 2 *) glsl 1.0 1.0 hsv material
(t) glsl 0 0 1 vec3 rotatesdf
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a rotating, pulsating 2D hexagon with a colorful material.'
    }]
};