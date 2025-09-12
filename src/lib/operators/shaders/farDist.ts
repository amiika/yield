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
            code: '1 sphere march 50 far render',
            assert: s => s[0]?.type === 'shader' && s[0].code.includes('if (t > 50.0)'),
            expectedDescription: 'A shader with a far distance of 50.'
        }
    ]
};