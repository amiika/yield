import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const triprism: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                dimensions: s.pop()
            };
            s.push(createMarchingObject('triprism', 'geometry', [], properties));
        },
        description: `Creates a triprism geometry.`,
        effect: `[dimensions] -> [sdf]`
    },
    examples: [{
        code: `0.2 0.5 vec2 triprism march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the geometry.'
    }, {
        code: `
# Animate the triprism's dimensions
(t 0.5 * sin 0.2 * 0.5 +) glsl # Animate radius
(t 0.5 * cos 0.2 * 0.5 +) glsl # Animate height
vec2 triprism
(p y 2 *) glsl 1.0 1.0 hsv material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering an animated triprism with a vertical color gradient.'
    }]
};