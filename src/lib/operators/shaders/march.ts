
import type { Operator, MarchingObject, SceneObject, Turtle3DObject } from '../../types';
import { isMarchingObject } from '../../utils';
import { interpretAndBuild3DTurtle, isTurtle3DQuotation } from '../turtle/interpreter';
import { generateSceneFromTurtle3D } from './glsl-generator';

const isSceneObject = (v: any): v is SceneObject => v && typeof v === 'object' && v.type === 'scene';

export const march: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const top = s.length > 0 ? s[s.length - 1] : undefined;
            
            if (!top) throw new Error('march expects an SDF object or a 3D Turtle quotation on the stack.');

            if (Array.isArray(top) && isTurtle3DQuotation(top)) {
                const quotation = s.pop() as any[];
                const turtle3dObject = yield* interpretAndBuild3DTurtle(quotation, options, evaluate);
                const scene = generateSceneFromTurtle3D(turtle3dObject);
                s.push(scene);
                return;
            }

            const sdfs: MarchingObject[] = [];
            while (s.length > 0 && isMarchingObject(s[s.length - 1])) {
                sdfs.unshift(s.pop() as MarchingObject);
            }
            if (sdfs.length === 0) throw new Error('march expects at least one SDF object or a 3D Turtle quotation on the stack.');
            
            let rootSDF: MarchingObject;
            if (sdfs.length > 1) {
                rootSDF = sdfs.reduce((a, b) => ({ op: 'union', type: 'combinator', children: [a, b], props: {} }));
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
        description: 'Collects all SDF objects or a 3D Turtle quotation from the stack, combines them into a scene, and prepares it for rendering.',
        effect: '[sdf1 sdf2... | L_3d_turtle_quotation] -> [scene]'
    },
    examples: [
        {
            code: `((0 0 0) p (10 move 10 yaw) 18 times) march render`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: 'A scene object built from a 3D turtle path.'
        },
        {
            code: ['1 sphere march'],
            assert: (s: any[]) => s.length === 1 && s[0]?.type === 'scene',
            expectedDescription: 'A scene object containing a sphere.'
        }
    ]
};