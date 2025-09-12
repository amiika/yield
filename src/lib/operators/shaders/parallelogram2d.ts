
import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const parallelogram2d: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                skew: s.pop(),
                height: s.pop(),
                width: s.pop(),
            };
            s.push(createMarchingObject('parallelogram2d', 'geometry', [], properties));
        },
        description: `Creates a 2D parallelogram geometry (extruded).`,
        effect: `[width height skew] -> [sdf]`
    },
    examples: [{
        code: `0.3 0.2 0.5 parallelogram2d randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `
# Animate the dimensions and skew
(t 0.5 * sin 0.2 * 0.5 +) glsl
(t 0.5 * cos 0.2 * 0.2 +) glsl
(t sin 0.5 *) glsl
parallelogram2d
1.0 1.2 1.4 wavecolor material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering an animated, morphing 2D parallelogram.'
    }]
};