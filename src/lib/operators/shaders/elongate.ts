import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const elongate: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                h: s.pop()
            };
            const a = s.pop();
            if (!isMarchingObject(a)) throw new Error(`elongate expects an SDF object on the stack.`);
            s.push(createMarchingObject('elongate', 'transformation', [a], properties));
        },
        description: `Applies a elongate transformation to an SDF object.`,
        effect: `[sdfA h] -> [sdfB]`
    },
    examples: [{
        code: `0.2 0.3 0.4 vec3 box 0.1 0.1 0.1 vec3 elongate march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the transformation.'
    }]
};