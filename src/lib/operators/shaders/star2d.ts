
import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const star2d: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                m: s.pop(),
                n: s.pop(),
                radius: s.pop(),
            };
            s.push(createMarchingObject('star2d', 'geometry', [], properties));
        },
        description: `Creates a 2D star geometry (extruded). N is the number of points, M controls the pointiness (must be between 2 and N).`,
        effect: `[radius n m] -> [sdf]`
    },
    examples: [{
        code: `0.5 5.0 2.5 star2d randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `
# Animate the pointiness (m) of the star
0.5 5
(t 0.5 * sin 1.5 * 2.5 +) glsl
star2d
:yellow material
(t) glsl 0 0 1 vec3 rotatesdf
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a rotating star with animated points.'
    }]
};