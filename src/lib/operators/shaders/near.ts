

import type { Operator, SceneObject } from '../../types';

const isSceneObject = (v: any): v is SceneObject => v && typeof v === 'object' && v.type === 'scene';

export const near: Operator = {
    definition: {
        exec: function*(s) {
            const dist = s.pop();
            const scene = s.pop();
            if (!isSceneObject(scene)) throw new Error('near operator expects a scene object.');
            if (typeof dist !== 'number' || dist <= 0) {
                throw new Error('near expects a positive number.');
            }
            scene.renderParams = { ...scene.renderParams, near: dist };
            s.push(scene);
        },
        description: 'Sets the near clip distance for raymarching. This is the minimum distance for a ray to hit a surface. A smaller value allows for more detailed close-ups but can increase rendering time. `scene dist near -> scene`',
        effect: '[scene F] -> [scene]'
    },
    examples: [
        {
            code: `
# A highly detailed psychobox fractal
12 psychobox
(p 2 *) glsl fluid material
march

# Set a very low near clip distance for high-detail closeups
0.0001 near

# Animate the camera to move slowly toward and away from the fractal
0 0 (t 0.2 * sin 0.5 * 1.5 +) glsl vec3  # Camera position
0 0 0 vec3    # Look at target
camera

# Render
render`,
            assert: s => s[0]?.type === 'shader' && s[0].code.includes('if (d.x < 0.0001)'),
            expectedDescription: 'A shader with a near distance of 0.0001 for a detailed close-up shot.'
        }
    ]
};