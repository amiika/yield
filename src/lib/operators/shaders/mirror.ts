

import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject } from '../../utils';

export const mirror: Operator = {
    definition: {
        exec: function*(s) {
            const a = s.pop();
            if (!isMarchingObject(a)) throw new Error(`mirror expects an SDF object on the stack.`);
            s.push(createMarchingObject('mirror', 'transformation', [a], {}));
        },
        description: `Applies a mirror transformation to an SDF object, creating symmetry across the origin planes (x=0, y=0, z=0).`,
        effect: `[sdfA] -> [sdfB]`
    },
    examples: [{
        code: [
`# An asymmetric box to better visualize the mirroring
0.2 0.4 0.2 vec3 box

# Animate the box's position in a figure-8 path to ensure it stays in view
(
    t sin 1.2 *        # Animate x-coordinate with radius 1.2
    t 2 * sin 0.5 * 0.5 + # Animate y-coordinate to move up and down
    t cos 1.2 *        # Animate z-coordinate with radius 1.2
    vec3
) glsl
translate

# Mirror the animated box across all axes
mirror

# Set up the scene
march

# Add a camera for a better viewpoint
0 2 6 vec3 0 0 0 vec3 camera

# Add two lights from opposite sides to ensure constant illumination
-3 3 4 vec3 "white" 0.1 light
 3 -1 4 vec3 "white" 0.1 light

# Render
render`
        ],
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object with 8 animated boxes mirrored across all axes, moving in a figure-8 path within view and well-lit.'
    }]
};