import type { Operator, MarchingObject, SceneObject } from '../../types';
import { isMarchingObject, createMarchingObject } from '../../utils';

export const smoothmarch: Operator = {
    definition: {
        exec: function*(s) {
            const smoothness = s.pop() as number;
            if (typeof smoothness !== 'number') throw new Error('smoothmarch expects a smoothness value on top of the stack.');
            
            const sdfs: MarchingObject[] = [];
            while (s.length > 0 && isMarchingObject(s[s.length - 1])) {
                sdfs.unshift(s.pop() as MarchingObject);
            }
            if (sdfs.length === 0) throw new Error('smoothmarch expects at least one SDF object on the stack.');
            
            let rootSDF: MarchingObject;
            if (sdfs.length > 1) {
                rootSDF = sdfs.reduce((a, b) => createMarchingObject('smoothUnion', 'combinator', [a, b], { smoothness }));
            } else {
                rootSDF = sdfs[0];
            }
            
            const scene: SceneObject = { type: 'scene', graph: rootSDF, lights: [] };
            s.push(scene);
        },
        description: 'Collects all SDF objects from the stack, combines them with a smooth union, and creates a scene. The smoothness factor is popped from the top of the stack.',
        effect: '[sdf1 sdf2... F_smoothness] -> [scene]'
    },
    examples: [{
        code: '0.8 sphere 0.5 0 0 vec3 translate 0.8 sphere -0.5 0 0 vec3 translate 0.2 smoothmarch render',
        assert: s => s[0]?.type === 'shader',
    }]
};
