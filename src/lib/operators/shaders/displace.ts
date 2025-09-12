


import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const displace: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                amount: s.pop()
            };
            const a = s.pop();
            if (!isMarchingObject(a)) throw new Error(`displace expects an SDF object on the stack.`);
            s.push(createMarchingObject('displace', 'alteration', [a], properties));
        },
        description: `Applies a displacement to the surface of an SDF object. The displacement amount can be a float or a GLSL expression for procedural patterns.`,
        effect: `[sdfA (F|glsl_expression)_amount] -> [sdfB]`
    },
    examples: [{
        code: `1.0 sphere
(
  p x 20 * sin
  p y 20 * sin *
  p z 20 * sin *
  0.1 *
) glsl
displace
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a displaced sphere.'
    }, {
        code: `
1.0 sphere
(
  # Use time 't' to animate the displacement pattern
  p x 10 * t + sin
  p y 10 * t + cos *
  p z 10 * t + sin *
  0.2 * # displacement amount
) glsl
displace
:cyan material
march
2 2 4 vec3 :white 0.1 light
render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a sphere with a writhing, animated surface displacement.'
    },
    {
        code: `
# A horizontal plane
0 1 0 vec3 0 plane
(
  # Sine wave based only on the p.x coordinate and time
  p x 10 * t + sin
  0.1 * # Control displacement amount
) glsl displace
:cyan material
march
# Use a better camera angle to view the ripples
0 2 5 vec3 0 0 0 vec3 camera
2 2 4 vec3 "white" 0.1 light
render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a plane with animated vertical ripples.'
    }]
};