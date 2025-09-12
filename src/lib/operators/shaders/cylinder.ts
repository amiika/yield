
import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const cylinder: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                dimensions: s.pop()
            };
            s.push(createMarchingObject('cylinder', 'geometry', [], properties));
        },
        description: `Creates a cylinder geometry.`,
        effect: `[dimensions] -> [sdf]`
    },
    examples: [{
        code: `0.8 0.5 vec2 cylinder march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the geometry.'
    }, {
        code: `
# Animate the cylinder's dimensions
(t 0.5 * sin 0.2 * 0.5 +) glsl # Animate radius
(t 0.5 * cos 0.2 * 0.5 +) glsl # Animate height
vec2 cylinder
:magenta material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering an animated cylinder.'
    }]
};
