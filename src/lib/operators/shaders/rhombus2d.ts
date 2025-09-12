
import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const rhombus2d: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                size: s.pop()
            };
            s.push(createMarchingObject('rhombus2d', 'geometry', [], properties));
        },
        description: `Creates a 2D rhombus geometry (extruded).`,
        effect: `[size] -> [sdf]`
    },
    examples: [{
        code: `0.5 0.2 vec2 rhombus2d randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `
# Animate the rhombus's dimensions
(t 0.5 * sin 0.2 * 0.5 +) glsl
(t 0.5 * cos 0.2 * 0.2 +) glsl
vec2 rhombus2d
:teal material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering an animated 2D rhombus.'
    }]
};
