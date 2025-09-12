import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const halve: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                direction: s.pop()
            };
            const a = s.pop();
            if (!isMarchingObject(a)) throw new Error(`halve expects an SDF object on the stack.`);
            s.push(createMarchingObject('halve', 'alteration', [a], properties));
        },
        description: `Applies a halve alteration to an SDF object.`,
        effect: `[sdfA direction] -> [sdfB]`
    },
    examples: [{
        code: `0.5 sphere 0.0 halve march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the alteration.'
    }]
};
