

import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const plane: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                distance: s.pop(),
                normal: s.pop()
            };
            s.push(createMarchingObject('plane', 'geometry', [], properties));
        },
        description: `Creates a plane geometry.`,
        effect: `[normal distance] -> [sdf]`
    },
    examples: [{
        code: `0 1 0 vec3 1.0 plane march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the geometry.'
    }, {
        code: `
0 1 0 vec3
# Animate the plane's distance from the origin
(t sin) glsl
plane
# Apply a checkerboard texture
"checkers" 10 texture
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a plane moving up and down with a checkerboard texture.'
    }]
};