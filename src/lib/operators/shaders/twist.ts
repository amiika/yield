import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const twist: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                amount: s.pop()
            };
            const a = s.pop();
            if (!isMarchingObject(a)) throw new Error(`twist expects an SDF object on the stack.`);
            s.push(createMarchingObject('twist', 'transformation', [a], properties));
        },
        description: `Applies a twist transformation to an SDF object.`,
        effect: `[sdfA amount] -> [sdfB]`
    },
    examples: [{
        code: `2 2 2 vec3 box 5.0 twist march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the transformation.'
    }]
};
