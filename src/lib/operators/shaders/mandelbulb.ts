import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const mandelbulb: Operator = {
    definition: {
        exec: function*(s) {
            s.push(createMarchingObject('mandelbulb', 'geometry', [], {}));
        },
        description: `Creates a mandelbulb fractal geometry.`,
        effect: `[] -> [sdf]`
    },
    examples: [{
        code: `mandelbulb
(p 2 *) glsl cnoise material
march
render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the geometry.'
    }, {
        code: `# Create the mandelbulb geometry
mandelbulb

# Apply an animated rotation around the Y-axis
(t 0.5 *) glsl 0 1 0 vec3 rotatesdf

# Apply an animated curl noise material for a psychedelic effect
(p 2 * t +) glsl curl material

# Create the scene
march

# Render the final image (without lighting)
render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'An animated, rotating mandelbulb with a psychedelic material.'
    }]
};