
import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const chamferIntersection: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                size: s.pop()
            };
            const b = s.pop();
            const a = s.pop();
            if (!isMarchingObject(a) || !isMarchingObject(b)) throw new Error(`chamferIntersection expects two SDF objects on the stack.`);
            s.push(createMarchingObject('chamferIntersection', 'combinator', [a, b], properties));
        },
        description: `Combines two SDFs with the chamferIntersection operation.`,
        effect: `[sdfA sdfB size] -> [sdfC]`
    },
    examples: [{
        code: `0.6 0.6 0.6 vec3 box 0.8 sphere 0.5 0.5 0.5 vec3 translate 0.1 chamferIntersection march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the combination.'
    }]
};
