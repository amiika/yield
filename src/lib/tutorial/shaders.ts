
import type { TutorialSection } from './types';

export const shaders: TutorialSection = {
    name: "Shaders: Creating Visuals",
    description: "You can create 3D visuals using Signed Distance Fields (SDFs).",
    cells: [
        {
            name: "Rendering a Shape",
            description: "First, create a shape like a `sphere`. Then, use `march` to create a scene object. Finally, `render` turns the scene into a visual shader.",
            example: "0.5 sphere march render",
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: "A shader object"
        },
        {
            name: "Adding Color",
            description: "Use the `material` operator to apply a color to a shape. You can use preset color names as strings.",
            example: "0.5 sphere :red material march render",
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: "A red shader object"
        },
        {
            name: "Procedural Animation",
            description: "Animate properties of shapes and materials over time using `t` and `mousey`. This example animates the 'scale' of a `mandelbox` fractal and cycles its color through the rainbow.",
            example: `
# Animate the 'scale' parameter of the mandelbox over time and with the mouse
(t sin 0.5 * 1.5 + mousey 0.005 * +) glsl # Scale
5.0                                      # Iterations
2.0                                      # Fold
mandelbox

# Apply an animated material that cycles through the rainbow
(
  t 0.2 * # Animate hue over time
  1.0     # Full saturation
  1.0     # Full brightness
  hsv
) glsl material

# Set up the scene, add a camera for a better view, and render
march
0 0 5 vec3 0 0 0 vec3 camera
render
`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: "A complex, animated shader object"
        },
        {
            name: "Animated Scene Tours",
            description: "The `path` operator can create cinematic fly-throughs of any 3D scene. You provide the scene and a path for the camera to follow, and it automatically carves a tunnel to avoid collisions.",
            example: `
# 1. A more detailed fractal world to make the tunnel more obvious
12 psychobox
# Make sure it's hollow for the fly-through by subtracting a smaller version
dup 0.95 resize 0.05 smoothDifference
# A procedural material based on position
(p 2 *) glsl fluid material
march

# 2. Define a path that weaves through the fractal's holes
(
    t 0.2 * sin 2.0 *  # x: a sine wave
    t 0.3 * cos 2.0 *  # y: a cosine wave, creating a Lissajous curve
    t                  # z: move forward steadily
    vec3
) glsl

# 3. Create the tour. The 'path' operator carves a smooth tunnel.
path`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: "An animated shader that flies through a psychedelic fractal."
        },
        {
            name: "Drawing Paths: The Flying Snake",
            description: "The `pathSDF` operator can render a path as a 3D tube, which is perfect for creating 'flying snake' or trail effects.",
            example: `
# 1. Define a spiraling path
(
    t 0.5 * sin # x
    t 0.5 * cos # y
    t           # z (moves forward over time)
    vec3
) glsl

# 2. Give the path a radius to create a tube
0.2

# 3. Create the path geometry
pathSDF

# 4. Apply a material that changes color along its length
(p z 0.5 *) glsl 1.0 1.0 hsv material

# 5. Set up the scene and a camera that follows the snake
march
(
    t 0.5 * sin 2 + # camera x
    t 0.5 * cos 2 + # camera y
    t               # z
    vec3
) glsl
(0 0 t vec3) glsl # camera target
camera
render`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: 'A shader object rendering a colorful, spiraling "flying snake".'
        }
    ]
};