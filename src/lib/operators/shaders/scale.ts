
import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const resize: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                amount: s.pop()
            };
            const a = s.pop();
            if (!isMarchingObject(a)) throw new Error(`resize expects an SDF object on the stack.`);
            s.push(createMarchingObject('scale', 'transformation', [a], properties));
        },
        description: `Resizes an SDF object with a uniform scale. The amount should be a single number. For non-uniform scaling, construct a scaling matrix and use 'transform'.`,
        effect: `[sdfA F_amount] -> [sdfB]`
    },
    examples: [{
        code: `0.5 sphere 1.5 resize march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the transformation.'
    }]
};