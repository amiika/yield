import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const round: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                amount: s.pop()
            };
            const a = s.pop();
            if (!isMarchingObject(a)) throw new Error(`round expects an SDF object on the stack.`);
            s.push(createMarchingObject('round', 'alteration', [a], properties));
        },
        description: `Applies a round alteration to an SDF object.`,
        effect: `[sdfA amount] -> [sdfB]`
    },
    examples: [{
        code: `0.4 0.4 0.4 vec3 box 0.1 round march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the alteration.'
    }]
};