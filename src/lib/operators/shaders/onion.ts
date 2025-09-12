import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const onion: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                thickness: s.pop()
            };
            const a = s.pop();
            if (!isMarchingObject(a)) throw new Error(`onion expects an SDF object on the stack.`);
            s.push(createMarchingObject('onion', 'alteration', [a], properties));
        },
        description: `Applies a onion alteration to an SDF object.`,
        effect: `[sdfA thickness] -> [sdfB]`
    },
    examples: [{
        code: `0.5 sphere 0.1 onion march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the alteration.'
    }]
};
