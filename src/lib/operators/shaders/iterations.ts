

import type { Operator, SceneObject } from '../../types';

const isSceneObject = (v: any): v is SceneObject => v && typeof v === 'object' && v.type === 'scene';

export const iterations: Operator = {
    definition: {
        exec: function*(s) {
            const count = s.pop();
            const scene = s.pop();
            if (!isSceneObject(scene)) throw new Error('iterations operator expects a scene object.');
            if (typeof count !== 'number' || !Number.isInteger(count) || count < 1) {
                throw new Error('iterations expects a positive integer count.');
            }
            scene.renderParams = { ...scene.renderParams, iterations: count };
            s.push(scene);
        },
        description: 'Sets the maximum number of raymarching steps for a scene. Higher values improve quality but decrease performance. `scene count iterations -> scene`',
        effect: '[scene I] -> [scene]'
    },
    examples: [
        {
            code: '1 sphere march 50 iterations render',
            assert: s => s[0]?.type === 'shader' && s[0].code.includes('i < 50;'),
            expectedDescription: 'A shader with 50 iterations.'
        },
        {
            code: `
# A detailed mandelbulb fractal
mandelbulb

# Animate rotation
(t 0.2 *) glsl 0 1 0 vec3 rotatesdf

# Apply a procedural material based on position
(p 2 *) glsl fluid material

# Set up scene
march

# Add a light
2 2 4 vec3 "white" 0.1 light

# Use a high iteration count for detail
128 iterations

# Render
render`,
            assert: s => s[0]?.type === 'shader' && s[0].code.includes('i < 128;'),
            expectedDescription: 'A shader with 128 iterations for a detailed fractal.'
        }
    ]
};