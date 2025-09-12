import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const mirrorY: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (!isMarchingObject(a)) throw new Error(`mirrorY expects an SDF object on the stack.`);
            s.push(createMarchingObject('mirrorY', 'transformation', [a], {}));
        },
        description: `Applies a mirrorY transformation to an SDF object.`,
        effect: `[sdfA] -> [sdfB]`
    },
    examples: [{
        code: `0.2 0.3 0.4 vec3 box 0 0.3 0 vec3 translate mirrorY march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the transformation.'
    }]
};