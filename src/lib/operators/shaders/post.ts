import type { Operator, SceneObject } from '../../types';

const isSceneObject = (v: any): v is SceneObject => v && typeof v === 'object' && v.type === 'scene';
const isPostEffectObject = (v: any): v is any => v && typeof v === 'object' && v.type === 'postEffect';

export const post: Operator = {
    definition: {
        exec: function*(s) {
            const effects: any[] = [];
            while(s.length > 0 && isPostEffectObject(s[s.length-1])) {
                effects.unshift(s.pop());
            }
            const scene = s.pop();
            if (!isSceneObject(scene)) throw new Error('post expects a scene object.');
            scene.post = [...(scene.post || []), ...effects];
            s.push(scene);
        },
        description: 'Adds one or more post-processing effects to a scene. `scene effect1... post -> scene`',
        effect: '[scene effect...] -> [scene]'
    },
    examples: [{
        code: '1 sphere march invert post render',
        assert: s => s[0]?.type === 'shader' && s[0].code.includes('post_invert')
    }]
};
