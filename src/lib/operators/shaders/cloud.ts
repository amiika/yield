import type { Operator } from '../../types';
import { toGLSL } from './glsl-generator';

export const cloud: Operator = {
    definition: {
        exec: function*(s) {
            const color2 = s.pop();
            const color1 = s.pop();
            s.push({ type: 'color', expression: `cloud_color(p, u_time, ${toGLSL(color1)}, ${toGLSL(color2)})` });
        },
        description: 'Creates an animated procedural cloud material. Takes two colors that define the primary palette of the clouds.',
        effect: '[color1 color2] -> [color]'
    },
    examples: [{
        code: `
# A plane to act as a ground for the clouds
0 1 0 vec3 0 plane

# Define two colors for the clouds and apply as material
0.1 0.2 0.3 rgb
0.8 0.9 1.0 rgb
cloud
material

# Set up the scene
march

# Add fog for atmospheric effect
0.2 # fog strength
0.5 0.6 0.7 rgb # fog color
fog

# Animate the camera to fly through the clouds
(t 0.1 *) glsl (t 0.2 * sin 2 +) glsl (t) glsl vec3 # camera position
0 (t 0.2 * sin 2 +) glsl (t 0.2 *) glsl vec3 # camera target
camera

render`,
        assert: s => s[0]?.type === 'shader',
        expectedDescription: 'A shader showing an animated camera flying over a plane with moving cloud textures and fog.'
    }, {
        code: `2 sphere
100 20 0 rgb
1 0 0 rgb
cloud material
march render`,
        assert: s => s[0]?.type === 'shader',
        expectedDescription: 'A shader object with a spehere textured with animated clouds.'
    }]
};