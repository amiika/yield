import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const roundbox: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                radius: s.pop(),
                size: s.pop()
            };
            s.push(createMarchingObject('roundbox', 'geometry', [], properties));
        },
        description: `Creates a roundbox geometry.`,
        effect: `[size radius] -> [sdf]`
    },
    examples: [{
        code: `0.4 0.4 0.4 vec3 0.1 roundbox march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the geometry.'
    }, {
        code: `
0.4 0.4 0.4 vec3
# Animate the roundness
(t sin 0.2 * 0.3 +) glsl
roundbox
(p 5 * t +) glsl cnoise material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a box that smoothly transitions to a sphere and back, with a noise texture.'
    }]
};