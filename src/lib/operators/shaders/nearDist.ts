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
        description: 'Sets the near clip distance for raymarching. This is the minimum distance for a ray to hit a surface. `scene dist near -> scene`',
        effect: '[scene F] -> [scene]'
    },
    examples: [
        {
            code: '1 sphere march 0.01 near render',
            assert: s => s[0]?.type === 'shader' && s[0].code.includes('if (d.x < 0.01)'),
            expectedDescription: 'A shader with a near distance of 0.01.'
        }
    ]
};