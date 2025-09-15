
import type { Operator } from '../../types';

export const position: Operator = {
    definition: {
        exec: function*(s) {
            // This is a no-op. 'position'/'p' is a special variable inside glsl quotations.
            // This definition exists primarily for documentation purposes.
        },
        description: "A special variable representing position (shorthand: `p`). Inside `glsl` quotations, `p` is a `vec3` representing the world-space coordinates of the point being shaded. In normal execution, this operator is a no-op.",
        effect: '[] -> []'
    },
    examples: [
        {
            code: `position`,
            expected: []
        },
        {
            code: `1.0 sphere (p x 5 *) glsl 1.0 1.0 hsv material march render`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: 'A shader using the position variable `p` to create a material.'
        }
    ]
};
