
import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const rotatesdf: Operator = {
    definition: {
        exec: function*(s) {
            const axis = s.pop();
            const angle = s.pop();
            const a = s.pop();
            if (!isMarchingObject(a)) throw new Error(`rotatesdf expects an SDF object on the stack.`);
            s.push(createMarchingObject('rotate', 'transformation', [a], { angle, axis }));
        },
        description: `Applies a rotate transformation to an SDF object.`,
        effect: `[sdfA angle axis] -> [sdfB]`
    },
    examples: [{
        code: `1 1 1 vec3 box 2 0 1 0 vec3 rotatesdf march render`,
        assert: s => s[0]?.type === 'shader'
    },
    {
        code: `
0.2 0.8 vec2 hexprism
(t) glsl # Animate the angle
(
  # Animate the rotation axis itself to create a wobble
  (t cos) glsl # x component of axis
  1.0          # y component of axis
  (t sin) glsl # z component of axis
  vec3
) glsl
rotatesdf
:magenta material
march render`,
        assert: s => s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a hexprism with a complex, wobbling rotation.'
    }]
};