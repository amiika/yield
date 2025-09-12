
import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const capsule: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                radius: s.pop(),
                end: s.pop(),
                start: s.pop(),
            };
            s.push(createMarchingObject('capsule', 'geometry', [], properties));
        },
        description: `Creates a capsule geometry.`,
        effect: `[start end radius] -> [sdf]`
    },
    examples: [{
        code: `-0.2 0 0 vec3 0.2 0 0 vec3 0.5 capsule march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the geometry.'
    }, {
        code: `
# Animate the endpoints of the capsule
(t sin -0.5 *) glsl 0 0 vec3
(t sin 0.5 *) glsl 0 0 vec3
# Animate the radius
(t cos 0.2 * 0.3 +) glsl
capsule
:cyan material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering an animated capsule that stretches, shrinks, and changes thickness.'
    }]
};
