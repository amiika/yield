

import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const mirrorRepeat: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                spacing: s.pop()
            };
            const a = s.pop();
            if (!isMarchingObject(a)) throw new Error(`mirrorRepeat expects an SDF object on the stack.`);
            s.push(createMarchingObject('mirrorRepeat', 'transformation', [a], properties));
        },
        description: `Applies a mirrorRepeat transformation to an SDF object.`,
        effect: `[sdfA spacing] -> [sdfB]`
    },
    examples: [{
        code: `0.5 sphere 1.5 1.5 0.0 vec3 mirrorRepeat march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the transformation.'
    }, {
        code: `
# A line shape, offset from the center
2 0.5 shape
0.5 0.5 0 vec3 translate
:orange material

# Animate the spacing of the mirror repeat to create a breathing, kaleidoscopic pattern
((t sin 1 *) 1.5 + (t cos 1 *) 1.5 + 0 vec3) glsl
mirrorRepeat

# Set up scene and render
march
2 2 4 vec3 :white 0.1 light
0 0 5 vec3 0 0 0 vec3 camera
render`,
        assert: (s) => s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering an intricate, symmetric, animated pattern.'
    }]
};