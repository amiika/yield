import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const mirrorZ: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (!isMarchingObject(a)) throw new Error(`mirrorZ expects an SDF object on the stack.`);
            s.push(createMarchingObject('mirrorZ', 'transformation', [a], {}));
        },
        description: `Applies a mirrorZ transformation to an SDF object.`,
        effect: `[sdfA] -> [sdfB]`
    },
    examples: [{
        code: `0.2 0.3 0.4 vec3 box 0 0 0.3 vec3 translate mirrorZ march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the transformation.'
    }]
};