

import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const repeat: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                spacing: s.pop()
            };
            const a = s.pop();
            if (!isMarchingObject(a)) throw new Error(`repeat expects an SDF object on the stack.`);
            s.push(createMarchingObject('repeat', 'transformation', [a], properties));
        },
        description: 'Repeats an SDF object at regular intervals along a vector.',
        effect: `[sdfA spacing] -> [sdfB]`
    },
    examples: [{
        code: `0.5 sphere 1.5 1.5 0.0 vec3 repeat march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the transformation.'
    }, {
        code: `
# A pentagon that pulses in size
5 (t sin 0.1 * 0.3 +) glsl shape
:cyan material

# Repeat it along the X-axis with animated spacing
((t cos 0.5 *) 1.5 + 0 0 vec3) glsl
repeat

# Set up scene and render
march
2 2 4 vec3 :white 0.1 light
0 0 5 vec3 0 0 0 vec3 camera
render`,
        assert: (s) => s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering an infinite line of pulsating pentagons that move closer and further apart.'
    }]
};