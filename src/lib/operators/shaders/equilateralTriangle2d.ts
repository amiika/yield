import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const equilateralTriangle2d: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                radius: s.pop()
            };
            s.push(createMarchingObject('equilateralTriangle2d', 'geometry', [], properties));
        },
        description: `Creates a 2D equilateral triangle geometry (extruded).`,
        effect: `[radius] -> [sdf]`
    },
    examples: [{
        code: `0.5 equilateralTriangle2d randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `
# Animate the radius of the triangle
(t 0.5 * sin 0.5 * 0.8 +) glsl
equilateralTriangle2d
"green" material
(t) glsl 0 0 1 vec3 rotatesdf
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a rotating, pulsating 2D triangle.'
    }]
};