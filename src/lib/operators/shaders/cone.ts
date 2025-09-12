import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const cone: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                dimensions: s.pop()
            };
            s.push(createMarchingObject('cone', 'geometry', [], properties));
        },
        description: `Creates a cone geometry.`,
        effect: `[dimensions] -> [sdf]`
    },
    examples: [{
        code: `0.8 0.5 vec2 cone march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the geometry.'
    }, {
        code: `
# Animate the cone's dimensions
(t 0.5 * sin 0.2 * 0.6 +) glsl # Animate cone angle
(t 0.5 * cos 0.2 * 0.5 +) glsl # Animate cone height
vec2 cone
1.0 1.2 1.4 wavecolor material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering an animated cone.'
    }]
};