
import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const translate: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                amount: s.pop()
            };
            const a = s.pop();
            if (!isMarchingObject(a)) throw new Error(`translate expects an SDF object on the stack.`);
            s.push(createMarchingObject('translate', 'transformation', [a], properties));
        },
        description: `Applies a translate transformation to an SDF object.`,
        effect: `[sdfA amount] -> [sdfB]`
    },
    examples: [{
        code: `0.5 sphere 0.5 0 0 vec3 translate march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the transformation.'
    },
    {
        code: `
# A small sphere to trace the path
0.1 sphere
# Create a dynamic translation vector for a Lissajous curve
(
  (t 2 * sin) glsl # x
  (t 3 * cos) glsl # y
  0.0              # z
  vec3
) glsl translate
:yellow material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a sphere moving in a Lissajous curve.'
    }]
};