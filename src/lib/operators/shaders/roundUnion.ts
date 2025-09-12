
import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const roundUnion: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                size: s.pop()
            };
            const b = s.pop();
            const a = s.pop();
            if (!isMarchingObject(a) || !isMarchingObject(b)) throw new Error(`roundUnion expects two SDF objects on the stack.`);
            s.push(createMarchingObject('roundUnion', 'combinator', [a, b], properties));
        },
        description: `Combines two SDFs with the roundUnion operation.`,
        effect: `[sdfA sdfB size] -> [sdfC]`
    },
    examples: [{
        code: `0.5 sphere 0.3 0.3 0.6 vec3 box 0.2 roundUnion march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the combination.'
    },
    {
        code: `
# A line
2 0.8 shape
# A circle, translated to one end of the line
1 0.3 shape 0.6 0 0 vec3 translate
# Create a rounded union
0.2 roundUnion
:purple material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a rounded union, creating a capsule-like shape.'
    }]
};