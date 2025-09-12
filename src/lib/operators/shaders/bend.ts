
import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const bend: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                amount: s.pop()
            };
            const a = s.pop();
            if (!isMarchingObject(a)) throw new Error(`bend expects an SDF object on the stack.`);
            s.push(createMarchingObject('bend', 'transformation', [a], properties));
        },
        description: `Applies a bend transformation to an SDF object.`,
        effect: `[sdfA amount] -> [sdfB]`
    },
    examples: [{
        code: `1 1 1 vec3 box 0.5 bend march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the transformation.'
    },
    {
        code: `
# Create a tall box to emphasize the bend
0.2 1.0 0.2 vec3 box

# Animate the bend amount over time
(t sin 2.0 *) glsl
bend

# Apply a colorful material for better visualization
(p y 2.0 *) glsl 1.0 1.0 hsv material

# Set up scene and render
march
2 2 4 vec3 "white" 0.1 light
render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a tall box that bends back and forth over time.'
    }]
};
