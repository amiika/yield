import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const circle2d: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                radius: s.pop()
            };
            s.push(createMarchingObject('circle2d', 'geometry', [], properties));
        },
        description: `Creates a 2D circle geometry (infinite cylinder).`,
        effect: `[radius] -> [sdf]`
    },
    examples: [{
        code: `0.5 circle2d randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `
# Animate the radius of the circle
(t 0.5 * sin 0.5 * 0.8 +) glsl
circle2d
1.0 1.2 1.4 wavecolor material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering an animated, pulsating circle with changing colors.'
    }]
};