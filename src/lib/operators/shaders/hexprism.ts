import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const hexprism: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                dimensions: s.pop()
            };
            s.push(createMarchingObject('hexprism', 'geometry', [], properties));
        },
        description: `Creates a hexprism geometry.`,
        effect: `[dimensions] -> [sdf]`
    },
    examples: [{
        code: `0.2 0.5 vec2 hexprism march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the geometry.'
    }, {
        code: `
# Animate the hexprism's dimensions
(t 0.5 * sin 0.2 * 0.5 +) glsl # Animate radius
(t 0.5 * cos 0.2 * 0.5 +) glsl # Animate height
vec2 hexprism
(p y 2 *) glsl 1.0 1.0 hsv material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering an animated hexprism with a vertical color gradient.'
    }]
};