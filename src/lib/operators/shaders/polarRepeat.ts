

import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const polarRepeat: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                count: s.pop()
            };
            const a = s.pop();
            if (!isMarchingObject(a)) throw new Error(`polarRepeat expects an SDF object on the stack.`);
            s.push(createMarchingObject('polarRepeat', 'transformation', [a], properties));
        },
        description: `Repeats an SDF object in a circle around the Z-axis. Uses a two-sample method to ensure correct distances, preventing artifacts with asymmetric shapes.`,
        effect: `[sdfA count] -> [sdfB]`
    },
    examples: [{
        code: `0.1 0.2 0.3 vec3 0.05 roundbox 0.8 0 0 vec3 translate 5.0 polarRepeat march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the transformation.'
    }, {
        code: `
# A triangle shape, made larger
3 0.25 shape
:magenta material
# Also rotate the triangle itself over time
(t) glsl 0 0 1 vec3 rotatesdf

# Translate the shape away from the origin to form a ring
3 0 0 vec3 translate

# Animate the number of repetitions in the circle
(t 0.01 * sin 0.1 * 25 + floor) glsl
polarRepeat

# Set up scene and render
march
1 2 4 vec3 :yellow 0.01 light
0 0 5 vec3 0 0 0 vec3 camera
render`,
        assert: (s) => s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a ring of spinning triangles, where the number of triangles animates over time.'
    }]
};