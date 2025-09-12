
import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const stairsUnion: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                steps: s.pop(),
                radius: s.pop()
            };
            const b = s.pop();
            const a = s.pop();
            if (!isMarchingObject(a) || !isMarchingObject(b)) throw new Error(`stairsUnion expects two SDF objects on the stack.`);
            s.push(createMarchingObject('stairsUnion', 'combinator', [a, b], properties));
        },
        description: `Combines two SDFs with the stairsUnion operation.`,
        effect: `[sdfA sdfB radius steps] -> [sdfC]`
    },
    examples: [{
        code: `0.5 sphere 0.3 0.3 0.6 vec3 box 0.2 4.0 stairsUnion march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the combination.'
    },
    {
        code: `
# A circle
1 0.5 shape
# A pentagon, translated
5 0.5 shape 0.6 0 0 vec3 translate
# Create 8 steps with a radius of 0.1
0.1 8.0 stairsUnion
:cyan material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a stepped union between a circle and a pentagon.'
    }]
};