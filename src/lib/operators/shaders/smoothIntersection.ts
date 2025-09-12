import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const smoothIntersection: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                smoothness: s.pop()
            };
            const b = s.pop();
            const a = s.pop();
            if (!isMarchingObject(a) || !isMarchingObject(b)) throw new Error(`smoothIntersection expects two SDF objects on the stack.`);
            s.push(createMarchingObject('smoothIntersection', 'combinator', [a, b], properties));
        },
        description: `Combines two SDFs with the smoothIntersection operation.`,
        effect: `[sdfA sdfB smoothness] -> [sdfC]`
    },
    examples: [{
        code: `0.5 sphere 0.3 0.3 0.6 vec3 box 0.2 smoothIntersection march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the combination.'
    }]
};
