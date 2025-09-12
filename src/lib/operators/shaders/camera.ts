
import type { Operator, SceneObject, GLSLExpression } from '../../types';

const isSceneObject = (v: any): v is SceneObject => v && typeof v === 'object' && v.type === 'scene';
const isGLSLExpression = (v: any): v is GLSLExpression => v?.type === 'glsl_expression';
const isVec3 = (v: any): boolean => Array.isArray(v) && v.length === 3;

export const camera: Operator = {
    definition: {
        exec: function*(s) {
            const target = s.pop();
            const pos = s.pop();
            const scene = s.pop();
            if (!isSceneObject(scene)) throw new Error('camera operator expects a scene object.');

            if (!isVec3(pos) && !isGLSLExpression(pos)) {
                throw new Error('camera operator expects a vec3 or glsl_expression for position.');
            }
            if (!isVec3(target) && !isGLSLExpression(target)) {
                throw new Error('camera operator expects a vec3 or glsl_expression for target.');
            }

            const existingCamera = scene.camera || { pos: [0, 0, 5], speed: 1, target: [0, 0, 0] };
            scene.camera = { ...existingCamera, pos, target };
            s.push(scene);
        },
        description: 'Sets the camera position and target for a scene. Position and target can be static `vec3` values or dynamic `glsl_expression` objects for animation. `scene (vec3|glsl_expr)_pos (vec3|glsl_expr)_target camera`',
        effect: '[scene (vec3|glsl_expr) (vec3|glsl_expr)] -> [scene]'
    },
    examples: [
        {code: '0.8 0.4 0.2 vec3 box march 2 0 6 vec3 0 0 0 vec3 camera render', assert: s => s[0].type === 'shader' && s[0].code.includes('vec3(2.0, 0.0, 6.0)')},
        {
            code: `
# An asymmetric box geometry to show camera movement
0.8 0.4 0.2 vec3 box "yellow" material march

# Animate the camera position to orbit around the origin
(
    t 0.5 * sin 5 * # x-coordinate
    2.0               # y-coordinate (height)
    t 0.5 * cos 5 * # z-coordinate
    vec3
) glsl

# Keep the camera pointed at the origin
0 0 0 vec3

# Apply the dynamic camera settings
camera

# Add a light that moves with the camera
(
    t 0.5 * sin 6 * # x
    2.5               # y
    t 0.5 * cos 6 * # z
    vec3
) glsl "white" 0.1 light

# Render the scene
render`,
            assert: s => s[0]?.type === 'shader' && s[0].code.includes('ro = vec3((sin((u_time * 0.5)) * 5.0), 2.0, (cos((u_time * 0.5)) * 5.0));'),
            expectedDescription: 'A shader object with a camera orbiting a box.'
        },
        {
            code: `
# A central object to look at
0.8 0.2 vec2 torus
(p 5 *) glsl curl material
march

# Define the camera position using normalized mouse coordinates to orbit the object
(
    # X position: 5.0 * sin(phi) * cos(theta)
    5.0 mousey 3.14 * sin * mousex 6.28 * cos *

    # Y position: 5.0 * cos(phi) - clamped to prevent flipping
    5.0 mousey 3.14 * 0.1 3.0 clamp cos *

    # Z position: 5.0 * sin(phi) * sin(theta)
    5.0 mousey 3.14 * sin * mousex 6.28 * sin *
    
    vec3
) glsl

# The camera always looks at the origin
0 0 0 vec3

camera
2 2 4 vec3 "white" 0.1 light
render`,
            assert: s => s[0].type === 'shader' && s[0].code.includes('u_mouse'),
            expectedDescription: 'A shader object with a camera that orbits a central object based on mouse position.'
        }
        ,
        {
            code: `
# A central object to look at
0.8 0.2 vec2 torus :red material march

# The camera position is controlled by where the mouse is held down
(
    (mousedx 0.5 -) 10.0 * # x from -5 to 5
    3.0                     # y is static
    (mousedy 0.5 -) 10.0 * # z from -5 to 5
    vec3
) glsl

# The camera always looks at the origin
0 0 0 vec3

camera
2 2 4 vec3 "white" 0.1 light
render`,
            assert: s => s[0].type === 'shader' && s[0].code.includes('u_moused'),
            expectedDescription: 'A shader object where clicking and dragging moves the camera position on the XZ plane.'
        }
    ]
};