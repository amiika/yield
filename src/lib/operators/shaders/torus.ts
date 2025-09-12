import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const torus: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                radii: s.pop()
            };
            s.push(createMarchingObject('torus', 'geometry', [], properties));
        },
        description: `Creates a torus geometry.`,
        effect: `[radii] -> [sdf]`
    },
    examples: [{
        code: `0.8 0.2 vec2 torus march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the geometry.'
    }, {
        code: `
# Animate the radii of the torus
0.8
(t 0.5 * sin 0.2 * 0.3 +) glsl
vec2 torus
(p x 5 *) glsl 1.0 1.0 hsv material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a torus with a pulsating tube radius and a colorful material.'
    }]
};