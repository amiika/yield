

import type { Operator, SceneObject } from '../../types';

const isSceneObject = (v: any): v is SceneObject => v && typeof v === 'object' && v.type === 'scene';

export const far: Operator = {
    definition: {
        exec: function*(s) {
            const dist = s.pop();
            const scene = s.pop();
            if (!isSceneObject(scene)) throw new Error('far operator expects a scene object.');
            if (typeof dist !== 'number' || dist <= 0) {
                throw new Error('far expects a positive number.');
            }
            scene.renderParams = { ...scene.renderParams, far: dist };
            s.push(scene);
        },
        description: 'Sets the far clip distance for raymarching. This is the maximum distance a ray will travel. `scene dist far -> scene`',
        effect: '[scene F] -> [scene]'
    },
    examples: [
        {
            code: `
# A scene with repeating mandelbulbs
mandelbulb
1.5 1.5 1.5 vec3 repeat
:orange material
march

# Use low iterations for speed
20 iterations

# Set a low far clipping distance
5 far

# Add a light
2 2 4 vec3 :white 0.1 light

# Animate camera moving backward to see objects get clipped by the far plane
0 0 (t) glsl vec3 # camera position
0 0 0 vec3       # look at target
camera

# Render - objects beyond 5 units will be clipped
render`,
            assert: s => s[0]?.type === 'shader' && s[0].code.includes('if (t > 5.0)'),
            expectedDescription: 'A shader with a far distance of 5, clipping distant objects.'
        }
    ]
};