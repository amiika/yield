
import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const smoothUnion: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                smoothness: s.pop()
            };
            const b = s.pop();
            const a = s.pop();
            if (!isMarchingObject(a) || !isMarchingObject(b)) throw new Error(`smoothUnion expects two SDF objects on the stack.`);
            s.push(createMarchingObject('smoothUnion', 'combinator', [a, b], properties));
        },
        description: `Combines two SDFs with the smoothUnion operation.`,
        effect: `[sdfA sdfB smoothness] -> [sdfC]`
    },
    examples: [{
        code: `0.5 sphere 0.3 0.3 0.6 vec3 box 0.2 smoothUnion march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the combination.'
    },
    {
        code: `
# A triangle
3 0.5 shape
# A square, translated
4 0.5 shape 0.5 0 0 vec3 translate
# Animate the smoothness
(t sin 0.5 * 0.5 +) glsl
smoothUnion
:orange material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a smoothly blended, animated union of a triangle and a square.'
    }]
};