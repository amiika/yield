

import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const rectangularRepeat: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                spacing: s.pop(),
                size: s.pop()
            };
            const a = s.pop();
            if (!isMarchingObject(a)) throw new Error(`rectangularRepeat expects an SDF object on the stack.`);
            s.push(createMarchingObject('rectangularRepeat', 'transformation', [a], properties));
        },
        description: `Repeats an SDF object along the perimeter of a rectangle. This is a fast, single-sample version that works best for shapes that are symmetric within their repetition cell.`,
        effect: `[sdfA size spacing] -> [sdfB]`
    },
    examples: [{
        code: `0.5 sphere 3 2 vec2 1.0 rectangularRepeat march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the transformation.'
    }, {
        code: `
# A small circle shape
1 0.1 shape
:yellow material

# Animate the size of the rectangular repetition to create a pulsating frame
(
  (t 0.5 * sin 1 * 2 +) # sx
  (t 0.5 * cos 1 * 2 +) # sy
  vec2
) glsl # size
1.0 # spacing
rectangularRepeat

# Set up scene and render
march
2 2 4 vec3 :white 0.1 light
0 0 5 vec3 0 0 0 vec3 camera
render`,
        assert: (s) => s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a pulsating rectangular frame of circles.'
    }]
};