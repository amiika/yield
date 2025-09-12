
import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const chamferUnion: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                size: s.pop()
            };
            const b = s.pop();
            const a = s.pop();
            if (!isMarchingObject(a) || !isMarchingObject(b)) throw new Error(`chamferUnion expects two SDF objects on the stack.`);
            s.push(createMarchingObject('chamferUnion', 'combinator', [a, b], properties));
        },
        description: `Combines two SDFs with the chamferUnion operation.`,
        effect: `[sdfA sdfB size] -> [sdfC]`
    },
    examples: [{
        code: `0.2 0.8 0.2 vec3 box 0.8 0.2 0.2 vec3 box 0.1 chamferUnion march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the combination.'
    },
    {
        code: `
# A square
4 0.4 shape
# Another square, translated
4 0.4 shape 0.3 0.3 0 vec3 translate
# Create a chamfered union
0.1 chamferUnion
:green material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a chamfered union of two squares.'
    }]
};