
import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const octahedron: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                size: s.pop()
            };
            s.push(createMarchingObject('octahedron', 'geometry', [], properties));
        },
        description: `Creates a octahedron geometry.`,
        effect: `[size] -> [sdf]`
    },
    examples: [{
        code: `1.0 octahedron march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the geometry.'
    }, {
        code: `
# Animate the octahedron's size
(t 0.5 * sin 0.5 * 1.0 +) glsl
octahedron
# Rotate it for a better view
(t 0.5 *) glsl 1 1 1 vec3 rotatesdf
:green material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a rotating, pulsating octahedron.'
    }]
};
