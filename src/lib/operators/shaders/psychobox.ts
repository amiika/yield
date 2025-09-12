


import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';
// Inspired by: https://www.shadertoy.com/view/4tGczc
export const psychobox: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                iterations: s.pop(),
            };
            s.push(createMarchingObject('psychobox', 'geometry', [], properties));
        },
        description: `Creates a psychedelic repeating fractal geometry.`,
        effect: `[iterations] -> [sdf]`
    },
    examples: [{
        code: `10 psychobox
march
2 2 5 vec3 "white" 0.1 light
0 0 6 vec3 0 0 0 vec3 camera
render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the fractal geometry.'
    },
    {
        code: `
# An animated psychobox with a colorful material
8 # iterations
psychobox

# Animate rotation
(t 0.1 *) glsl 0 1 0 vec3 rotatesdf

# Apply a procedural material based on position and time
(p 3 * t +) glsl curl material

# Set up scene
march

# Add a light for better visibility
2 2 4 vec3 "white" 0.1 light

# Set camera and clipping planes for fractal rendering
0 0 5 vec3 0 0 0 vec3 camera
0.0001 near # Use a small near plane for fractal detail
20 far       # Set a reasonable far plane

# Render
render`,
        assert: s => s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a rotating, psychedelic fractal.'
    }]
};