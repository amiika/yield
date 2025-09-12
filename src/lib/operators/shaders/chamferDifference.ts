
import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const chamferDifference: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                size: s.pop()
            };
            const b = s.pop();
            const a = s.pop();
            if (!isMarchingObject(a) || !isMarchingObject(b)) throw new Error(`chamferDifference expects two SDF objects on the stack.`);
            s.push(createMarchingObject('chamferDifference', 'combinator', [a, b], properties));
        },
        description: `Combines two SDFs with the chamferDifference operation.`,
        effect: `[sdfA sdfB size] -> [sdfC]`
    },
    examples: [{
        code: `0.5 0.5 0.5 vec3 box 0.6 sphere 0.5 0.5 0.5 vec3 translate 0.1 chamferDifference march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the combination.'
    }]
};
