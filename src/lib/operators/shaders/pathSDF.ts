




import type { Operator, GLSLExpression } from '../../types';
import { createMarchingObject } from '../../utils';

const isGLSLExpression = (v: any): v is GLSLExpression => v?.type === 'glsl_expression';

export const pathSDF: Operator = {
    definition: {
        exec: function*(s) {
            const radius = s.pop();
            const path_expr = s.pop();

            if (!isGLSLExpression(path_expr)) {
                throw new Error('pathSDF expects a glsl_expression for the path.');
            }
            if (typeof radius !== 'number' && !isGLSLExpression(radius)) {
                throw new Error('pathSDF expects a number or glsl_expression for the radius.');
            }

            const properties = {
                radius: radius,
                path: path_expr,
            };
            s.push(createMarchingObject('pathSDF', 'geometry', [], properties));
        },
        description: `Creates a 3D tube geometry that follows a given path. The path must be a GLSL expression that returns a vec3 based on a float 't'. The radius can be a static float or a dynamic GLSL expression.`,
        effect: `[glsl_path_expr radius] -> [sdf]`
    },
    examples: [
        {
            code: `
# Define a spiraling path for our "flying snake"
(
    t 0.5 * sin # x
    t 0.5 * cos # y
    t           # z (moves forward over time)
    vec3
) glsl

# Give it a radius
0.2

# Create the path geometry
pathSDF

# Apply a material that changes color along the path's length
(p z 0.5 *) glsl 1.0 1.0 hsv material

# Set up the scene and a camera that follows the snake
march
(
    t 0.5 * sin 2 + # camera x
    t 0.5 * cos 2 + # camera y
    t               # z
    vec3
) glsl
(
    0 0 t vec3
) glsl
camera
render`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: 'A shader object rendering a colorful, spiraling "flying snake" with a moving camera.'
        },
        {
            code: `
# Space Warp Tunnel: A path that looks like a helix
( t 0.2 * sin 2 * t 0.2 * cos 2 * t vec3 ) glsl

# A radius that pulsates over the length of the path
# using p.z (which is the path parameter 't')
(p z 0.5 * sin 0.1 * 0.15 +) glsl

# Create the path geometry
pathSDF

# Hollow it out to make it a tunnel
0.05 onion

# Animate the material inside the tunnel
(p x p y + 5 * t +) glsl 1.0 1.0 hsv material

march
# A camera that flies through the tunnel
(0 0 t vec3) glsl
(0 0 (t 1 +) vec3) glsl
camera
render
`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: 'A shader rendering a flight through a pulsating, colorful, helix-shaped tunnel.'
        },
        {
            code: `
# Define a rollercoaster path progressing along the Z axis
(
    (t 2.0 *) sin 2.0 *    # x: go left and right
    (t 4.0 *) cos 0.5 *    # y: go up and down
    t 2.0 *                # z: move forward
    vec3
) glsl

# Give the track a radius
0.2
pathSDF

# Color the track based on its height
(p y 0.5 + 0.5 *) glsl 1.0 1.0 hsv material

march

# Camera follows the path from a "rider's" perspective
# Camera Position (ro) is slightly above the track
(
    (t 2.0 *) sin 2.0 *
    ((t 4.0 *) cos 0.5 * 0.3 +)
    (t 2.0 *)
    vec3
) glsl

# Camera Target (ta) is slightly ahead on the track
(
    ((t 0.1 +) 2.0 *) sin 2.0 *
    ((t 0.1 +) 4.0 *) cos 0.5 *
    ((t 0.1 +) 2.0 *)
    vec3
) glsl
camera

render`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: 'A shader rendering a colorful rollercoaster track with a first-person camera.'
        }
    ]
};