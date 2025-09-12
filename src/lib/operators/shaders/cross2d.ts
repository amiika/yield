
import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const cross2d: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                radius: s.pop(),
                size: s.pop(),
            };
            s.push(createMarchingObject('cross2d', 'geometry', [], properties));
        },
        description: `Creates a 2D cross geometry (extruded).`,
        effect: `[size radius] -> [sdf]`
    },
    examples: [{
        code: `0.5 0.2 vec2 0.1 cross2d randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `
# Animate the size of the cross
(t 0.5 * sin 0.2 * 0.5 +) glsl
(t 0.5 * cos 0.2 * 0.2 +) glsl
vec2 0.1 cross2d
"cyan" material
(t) glsl 0 0 1 vec3 rotatesdf
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a rotating, pulsating 2D cross.'
    }]
};