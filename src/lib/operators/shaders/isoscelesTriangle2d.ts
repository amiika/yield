import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const isoscelesTriangle2d: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                size: s.pop()
            };
            s.push(createMarchingObject('isoscelesTriangle2d', 'geometry', [], properties));
        },
        description: `Creates a 2D isosceles triangle geometry (extruded).`,
        effect: `[size] -> [sdf]`
    },
    examples: [{
        code: `0.5 0.8 vec2 isoscelesTriangle2d randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `
# Animate the triangle's dimensions
(t 0.5 * sin 0.2 * 0.5 +) glsl
(t 0.5 * cos 0.2 * 0.8 +) glsl
vec2 isoscelesTriangle2d
1.0 1.2 1.4 wavecolor material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering an animated 2D isosceles triangle.'
    }]
};