
import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const moon2d: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                rb: s.pop(),
                ra: s.pop(),
                d: s.pop(),
            };
            s.push(createMarchingObject('moon2d', 'geometry', [], properties));
        },
        description: `Creates a 2D moon geometry (extruded).`,
        effect: `[d ra rb] -> [sdf]`
    },
    examples: [{
        code: `0.3 0.4 0.5 moon2d randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 3D geometry.'
    }, {
        code: `0.3 0.4 0.5 moon2d randomcolor material render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the 2D geometry.'
    }, {
        code: `# Animate the moon phase by changing the distance 'd' between the circles
(t sin 0.3 * 0.4 +) glsl
# Define the two radii
0.4 0.3
# Create the moon geometry
moon2d

# Apply an animated horizontal rotation around the Y-axis
(t) glsl 0 1 0 vec3 rotatesdf

# Add a material and render the scene
"yellow" material
march
render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering an animated, rotating 2D moon.'
    }]
};