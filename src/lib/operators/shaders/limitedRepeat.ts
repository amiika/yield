

import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const limitedRepeat: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                limits: s.pop(),
                spacing: s.pop()
            };
            const a = s.pop();
            if (!isMarchingObject(a)) throw new Error(`limitedRepeat expects an SDF object on the stack.`);
            s.push(createMarchingObject('limitedRepeat', 'transformation', [a], properties));
        },
        description: `Applies a limitedRepeat transformation to an SDF object.`,
        effect: `[sdfA spacing limits] -> [sdfB]`
    },
    examples: [{
        code: `0.5 sphere 1.5 1.5 1.5 vec3 2 2 2 vec3 limitedRepeat march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the transformation.'
    },
    {
        code: `
# Define a single picket
4 0.2 shape 0 0.2 0 vec3 translate # The post
3 0.2 shape 0 0.4 0 vec3 translate # The top
0.01 smoothUnion # Join them smoothly

# Repeat the picket to make a fence
0.5 0 0 vec3  # Spacing along X-axis
5 0 0 vec3    # Repeat 5 times on each side of the origin on X
limitedRepeat

# Give it a white color
:white material

# Set up the scene
march
0.2 0.7 0.8 rgb swap background # Sky blue background
0 0.1 2 vec3 0 0.1 0 vec3 camera
-2 1 3 vec3 :white 0.1 light
render`,
        assert: (s) => s[0]?.type === 'shader',
        expectedDescription: 'A shader rendering a white picket fence against a blue sky.'
    },
    {
        code: `
# Define a tile unit with two shapes and colors
4 0.3 shape :blue material
5 0.3 shape 0.3 0.3 0 vec3 translate :red material
0.1 smoothUnion

# Repeat the tile unit in a 3x3 grid on the XZ plane
# Repeat 3 times along X
0.7 0 0 vec3 1 0 0 vec3 limitedRepeat
# Repeat the row of tiles 3 times along Z
0 0 0.7 vec3 0 0 1 vec3 limitedRepeat

# Set up scene
march
# Add a light orbiting above the floor
((t sin 4 *) 3.0 (t cos 4 *) vec3) glsl :white 0.05 light
# Set camera to look down at the floor
0 4 0.1 vec3 0 0 0 vec3 camera
render`,
        assert: (s) => s[0]?.type === 'shader',
        expectedDescription: 'A shader rendering a 3x3 tiled floor with an animated light source.'
    },
    {
        code: `
# Create a base hexagonal shape and animate its radius to make it pulse
(t sin 0.2 * 0.4 +) glsl 6 swap shape

# Apply a psychedelic animated material
1.0 1.2 1.4 wavecolor material

# Repeat it 5 times horizontally to create a wall
1.0 0 0 vec3 # spacing
2 0 0 vec3   # limits (2 on each side + origin = 5 total)
limitedRepeat

# Set up scene and render
march
2 2 5 vec3 :white 0.1 light
render`,
        assert: (s) => s[0]?.type === 'shader',
        expectedDescription: 'A shader rendering a wall of 5 pulsating, color-shifting hexagons.'
    },
    {
        code: `
# A simple cube will be our repeated unit
4 0.2 shape
(p 5 * t +) glsl curl material

# Animate the limits of the repetition to make the line of cubes grow
1.0 0 0 vec3 # spacing
((t 0.5 * floor 3 +) 0 0 vec3) glsl # Animate X limit from 0 to 3
limitedRepeat

# Set up the scene with a camera that pulls back
march
((t 0.5 *) 3 4 vec3) glsl 0 0 0 vec3 camera
2 2 5 vec3 :white 0.1 light
render`,
        assert: (s) => s[0]?.type === 'shader',
        expectedDescription: 'A shader showing a line of cubes that grows in number over time.'
    },
    {
        code: `
# Create a single ring using difference
1 0.25 shape # Outer circle
1 0.2 shape  # Inner circle
difference
:gray material

# Repeat the ring, animating the spacing between links
(t sin 0.1 * 0.5 + 0.6 + 0 0 vec3) glsl
3 0 0 vec3 # limits (7 links total)
limitedRepeat

march
-2 2 4 vec3 :white 0.1 light
2 -2 4 vec3 :white 0.1 light
0 0 5 vec3 0 0 0 vec3 camera
render`,
        assert: (s) => s[0]?.type === 'shader',
        expectedDescription: 'A shader rendering a chain of 7 rings that expands and contracts.'
    }]
};