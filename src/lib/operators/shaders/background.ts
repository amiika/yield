import type { Operator, SceneObject } from '../../types';

const isSceneObject = (v: any): v is SceneObject => v && typeof v === 'object' && v.type === 'scene';

export const background: Operator = {
    definition: {
        exec: function*(s) {
            const scene = s.pop();
            if (!isSceneObject(scene)) throw new Error('background operator expects a scene object.');
            const color = s.pop();
            scene.background = color;
            s.push(scene);
        },
        description: 'Sets the background color of a scene. `(vec3_color|color_obj) scene background -> scene`',
        effect: '[(vec3|color) scene] -> [scene]'
    },
    examples: [{code: '0.5 0.6 0.7 vec3 1 sphere march background render', assert: s => s[0].type === 'shader' && s[0].code.includes('vec3(0.5, 0.6, 0.7)')}]
};
