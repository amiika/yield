
import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const box: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                size: s.pop()
            };
            s.push(createMarchingObject('box', 'geometry', [], properties));
        },
        description: `Creates a box geometry.`,
        effect: `[size] -> [sdf]`
    },
    examples: [{
        code: `0.5 0.5 0.5 vec3 box march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the geometry.'
    }, {
        code: `
# Animate the box size
(t 0.5 * sin 0.2 * 0.5 +) glsl # sx
(t 0.5 * cos 0.2 * 0.5 +) glsl # sy
(t 0.5 * sin 0.2 * 0.5 +) glsl # sz
vec3 box
:yellow material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering an animated, pulsating box.'
    }]
};
