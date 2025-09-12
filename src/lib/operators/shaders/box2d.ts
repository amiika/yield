import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const box2d: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                size: s.pop()
            };
            s.push(createMarchingObject('box2d', 'geometry', [], properties));
        },
        description: `Creates a 2D box geometry (extruded rectangular prism).`,
        effect: `[size] -> [sdf]`
    },
    examples: [{
        code: `0.5 0.8 vec2 box2d randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `
# Animate the box size
(t 0.5 * sin 0.2 * 0.5 +) glsl
(t 0.5 * cos 0.2 * 0.8 +) glsl
vec2 box2d
"yellow" material
(t) glsl 0 0 1 vec3 rotatesdf
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a rotating, pulsating 2D box.'
    }]
};