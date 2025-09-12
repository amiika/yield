import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const sphere: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                radius: s.pop()
            };
            s.push(createMarchingObject('sphere', 'geometry', [], properties));
        },
        description: `Creates a sphere geometry.`,
        effect: `[radius] -> [sdf]`
    },
    examples: [{
        code: `0.5 sphere march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the geometry.'
    }, {
        code: `
# Animate the sphere's radius
(t sin 0.5 * 0.8 +) glsl
sphere
# Animate the color
1.0 1.2 1.4 wavecolor material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering an animated, pulsating sphere with changing colors.'
    }]
};