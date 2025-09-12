import type { Operator, MarchingObject, SceneObject } from '../../types';
import { isMarchingObject, createMarchingObject } from '../../utils';

const isSceneObject = (v: any): v is SceneObject => v && typeof v === 'object' && v.type === 'scene';

export const march: Operator = {
    definition: {
        exec: function*(s) {
            const sdfs: MarchingObject[] = [];
            while (s.length > 0 && isMarchingObject(s[s.length - 1])) {
                sdfs.unshift(s.pop() as MarchingObject);
            }
            if (sdfs.length === 0) throw new Error('march expects at least one SDF object on the stack.');
            
            let rootSDF: MarchingObject;
            if (sdfs.length > 1) {
                rootSDF = sdfs.reduce((a, b) => createMarchingObject('union', 'combinator', [a, b]));
            } else {
                rootSDF = sdfs[0];
            }
            
            const scene: SceneObject = {
                type: 'scene',
                graph: rootSDF,
                lights: [],
            };
            s.push(scene);
        },
        description: 'Collects all SDF objects from the stack, combines them with a union operation if there are multiple, and creates a single scene object.',
        effect: '[sdf1 sdf2...] -> [scene]'
    },
    examples: [{
        code: ['1 sphere march'],
        assert: (s: any[]) => s.length === 1 && s[0]?.type === 'scene',
        expectedDescription: 'A shader object showing a sphere.'
    }]
};
