
import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const heart2d: Operator = {
    definition: {
        exec: function*(s) {
            s.push(createMarchingObject('heart2d', 'geometry', [], {}));
        },
        description: `Creates a 2D heart geometry (extruded).`,
        effect: `[] -> [sdf]`
    },
    examples: [{
        code: `heart2d
:red material
(t) glsl 0 1 0 vec3 rotatesdf
march
render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `heart2d 0.2 scale randomcolor material render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 2D geometry.'
    }]
};