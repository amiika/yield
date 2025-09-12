import type { Operator, SceneObject } from '../../types';

const isSceneObject = (v: any): v is SceneObject => v && typeof v === 'object' && v.type === 'scene';

export const shadow: Operator = {
    definition: {
        exec: function*(s) {
            const diffuseness = s.pop();
            const scene = s.pop();
            if (!isSceneObject(scene)) throw new Error('shadow operator expects a scene object.');
            scene.shadow = { diffuseness };
            s.push(scene);
        },
        description: 'Adds soft shadows to a scene. Higher diffuseness values create harder shadows. `scene F_diffuseness shadow -> scene`',
        effect: '[scene F] -> [scene]'
    },
    examples: [{code: '0.5 sphere 0 1 -2 vec3 translate march 8 shadow render', assert: s => s[0].type === 'shader' && s[0].code.includes('calcSoftshadow')}]
};
