import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const hexagram2d: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                radius: s.pop()
            };
            s.push(createMarchingObject('hexagram2d', 'geometry', [], properties));
        },
        description: `Creates a 2D hexagram geometry (extruded).`,
        effect: `[radius] -> [sdf]`
    },
    examples: [{
        code: `0.5 hexagram2d randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `
# Animate the radius of the hexagram
(t 0.5 * sin 0.5 * 0.8 +) glsl
hexagram2d
(p x p y * 5 *) glsl 1.0 1.0 hsv material
(t) glsl 0 0 1 vec3 rotatesdf
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a rotating, pulsating 2D hexagram with a colorful material.'
    }]
};