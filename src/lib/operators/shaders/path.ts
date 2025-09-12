


import type { Operator, SceneObject, GLSLExpression } from '../../types';
import { generatePathShader } from './glsl-generator';

const isSceneObject = (v: any): v is SceneObject => v && typeof v === 'object' && v.type === 'scene';
const isGLSLExpression = (v: any): v is GLSLExpression => v?.type === 'glsl_expression';

export const path: Operator = {
    definition: {
        exec: function*(s) {
            const top = s.pop();
            const second = s.pop();
            const third = s.length > 0 ? s[s.length - 1] : undefined;

            let scene: SceneObject;
            let path_quotation: GLSLExpression;
            let look_around_quotation: GLSLExpression | undefined = undefined;

            if (isGLSLExpression(top) && isSceneObject(second)) {
                // Path quotation is on top. [scene (path_glsl)]
                path_quotation = top;
                scene = second;
            } else if (isGLSLExpression(top) && isGLSLExpression(second) && isSceneObject(third)) {
                // Look around is on top. [scene (path_glsl) (look_glsl)]
                look_around_quotation = top;
                path_quotation = second;
                scene = s.pop() as SceneObject;
            } else {
                // Invalid arguments. Push them back to not lose them.
                s.push(second, top); 
                throw new Error('path expects [scene (path_glsl)] or [scene (path_glsl) (look_glsl)].');
            }
            
            const shaderCode = generatePathShader(scene, path_quotation, look_around_quotation);

            s.push({ type: 'shader', code: shaderCode });
        },
        description: `Creates a cinematic fly-through of a scene. Takes a scene object and a path quotation. An optional third GLSL quotation can be provided for interactive "look-around" control. The path quotation must be a GLSL expression that takes a float 't' and returns a 'vec3' position. The look-around quotation should return a 'vec2' to offset the view. The operator automatically carves a tunnel through the scene to avoid camera collisions.`,
        effect: `[scene (path_glsl) (look_glsl)?] -> [shader]`
    },
    examples: [
        {
            code: `
# 1. Define the world (a psychedelic fractal)
2 psychobox
(p 1 *) glsl curl material
march

# 2. Define a rollercoaster-like path
(
    t 0.25 * # scale time
    dup 2.5 * sin 0.1 * # x
    swap dup cos 0.5 * swap 0.2 * sin 1 * + # y
    t 0.5 * # z
    vec3
) glsl

# 3. Create the tour
path
`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: 'An animated shader that flies through a psychedelic fractal.'
        },
        {
            code: `
# 1. Define the world: a tunnel of rotating, colorful rings
0.8 0.1 vec2 torus # A thin ring
(p z 2 *) glsl 1.0 1.0 hsv material # Color changes with depth
(t) glsl 0 1 0 vec3 rotatesdf # Rotate rings around Y axis
0 0 1.5 vec3 repeat # Repeat every 1.5 units along Z axis
march

# 2. Define a straight path forward for a "warp speed" effect
(
    0 0 t vec3
) glsl

# 3. Create the tour
path
`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: 'A shader that flies through a tunnel of rotating rings.'
        },
        {
            code: `
# 1. Define the world: repeating mandelbulbs
mandelbulb
(p z 2 *) glsl 1.0 1.0 hsv material
0 0 4.0 vec3 repeat
march

# 2. Define a straight path for a cinematic fly-through
(0 0 t vec3) glsl

# 3. Create the wormhole-like tour
path
`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: 'A shader that flies through a repeating scene of colorful mandelbulbs.'
        },
        {
            code: `
# 1. A world of repeating, rotating spheres
0.2 sphere
(t 0.5 *) glsl 1 1 0 vec3 rotatesdf
2 2 2 vec3 repeat
(p z 2 *) glsl 1.0 1.0 hsv material
march

# 2. A simple path moving forward
(0 0 t vec3) glsl

# 3. A GLSL expression to control the view with the mouse
# Normalizes mouse coords to [-1, 1] range to be used as view offsets
(
  mouse u_resolution / 0.5 - 2.0 *
) glsl

# 4. Create the interactive tour
path
`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader' && s[0].code.includes('vec2 look ='),
            expectedDescription: 'An interactive shader that lets you look around with the mouse while flying through a field of spheres.'
        }
        ,
        {
            code: `
# 1. A world of repeating, rotating spheres
0.2 sphere
(t 0.5 *) glsl 1 1 0 vec3 rotatesdf
2 2 2 vec3 repeat
(p z 2 *) glsl 1.0 1.0 hsv material
march

# 2. A simple path moving forward
(0 0 t vec3) glsl

# 3. A GLSL expression to control the view with the mouse when held down
# Normalizes mouse coords to [-1, 1] range to be used as view offsets
(
  moused u_resolution / 0.5 - 2.0 *
  u_moused.z # Only apply lookaround when mouse is down
  *
) glsl

# 4. Create the interactive tour
path
`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader' && s[0].code.includes('u_moused.z'),
            expectedDescription: 'An interactive shader where you can look around by clicking and dragging the mouse while flying through a field of spheres.'
        }
    ]
};