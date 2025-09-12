
import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const difference: Operator = {
    definition: {
        exec: function*(s) {
            const b = s.pop();
            const a = s.pop();
            if (!isMarchingObject(a) || !isMarchingObject(b)) throw new Error(`difference expects two SDF objects on the stack.`);
            s.push(createMarchingObject('difference', 'combinator', [a, b], {}));
        },
        description: `Combines two SDFs with the difference operation.`,
        effect: `[sdfA sdfB] -> [sdfC]`
    },
    examples: [{
        code: `0.5 sphere 0.3 0.3 0.6 vec3 box  difference march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the combination.'
    },
    {
        code: `
# A static box
0.5 0.5 0.5 vec3 box

# A sphere whose radius animates, creating a pulsating effect
(t 0.5 * sin 0.2 * 0.4 +) glsl sphere

# Subtract the sphere from the box
difference

# Apply a material
:magenta material

# Set up the scene and render
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a box with a pulsating sphere-shaped hole cut out of it.'
    }]
};
