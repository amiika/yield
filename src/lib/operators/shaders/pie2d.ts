
import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const pie2d: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                radius: s.pop(),
                c: s.pop(),
            };
            s.push(createMarchingObject('pie2d', 'geometry', [], properties));
        },
        description: `Creates a 2D pie slice geometry (extruded).`,
        effect: `[c radius] -> [sdf]`
    },
    examples: [{
        code: `0.866 0.5 vec2 0.5 pie2d randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `
# Animate the angle of the pie slice
(t cos) glsl (t sin) glsl vec2
0.5 pie2d
1.0 1.2 1.4 wavecolor material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering an animated "pac-man" effect.'
    }]
};