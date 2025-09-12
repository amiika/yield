
import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const scale: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                amount: s.pop()
            };
            const a = s.pop();
            if (!isMarchingObject(a)) throw new Error(`scale expects an SDF object on the stack.`);
            s.push(createMarchingObject('scale', 'transformation', [a], properties));
        },
        description: `Applies a uniform scale transformation to an SDF object. The amount should be a single number. For non-uniform scaling, construct a scaling matrix and use the 'transform' operator.`,
        effect: `[sdfA F_amount] -> [sdfB]`
    },
    examples: [{
        code: `0.5 sphere 1.5 scale march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the transformation.'
    }]
};
