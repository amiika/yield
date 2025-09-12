

import type { Operator, SceneObject } from '../../types';

const isSceneObject = (v: any): v is SceneObject => v && typeof v === 'object' && v.type === 'scene';

export const fog: Operator = {
    definition: {
        exec: function*(s) {
            const color = s.pop();
            const strength = s.pop();
            const scene = s.pop();
            if (!isSceneObject(scene)) throw new Error('fog operator expects a scene object.');
            scene.fog = { strength, color };
            s.push(scene);
        },
        description: 'Adds distance fog to a scene. `scene F_strength (vec3_color|color_obj) fog -> scene`',
        effect: '[scene F (vec3|color)] -> [scene]'
    },
    examples: [
      {code: '0 1 0 vec3 1.0 plane march 0.25 0.8 0.8 0.95 vec3 fog render', assert: s => s[0].type === 'shader' && s[0].code.includes('mix(col, vec3(0.8, 0.8, 0.95)')},
      {code: '1 sphere march 0.2 0.8 0.8 0.9 vec3 fog render', assert: s => s[0].type === 'shader' && s[0].code.includes('mix(col, vec3(0.8, 0.8, 0.9)')}]
};