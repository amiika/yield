
import type { Operator } from '../../types';

export const p: Operator = {
    definition: {
        exec: function*() {
            // This is a placeholder. The actual logic is handled by
            // the sandboxed turtle interpreters in 'image' and 'march'.
            // A naked 'p' in the main interpreter will now be a no-op, which
            // may lead to stack errors but won't crash the turtle parser itself.
        },
        description: "A universal drawing initializer and GLSL variable. Inside a quotation for `image`, `(x y) p` initializes a 2D turtle. Inside a quotation for `march`, `(x y z) p` initializes a 3D turtle. Inside `glsl` quotations, `p` is a `vec3` representing the world-space coordinates of the point being shaded.",
        effect: '(in quotation) [vec] -> []'
    },
    examples: [
        {
            code: `(10 20 vec2 p 50 forward) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: 'A shader object rendering a line starting from (10, 20).'
        },
        {
            code: `(5 10 15 vec3 p 10 move) march render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: 'A shader object rendering a 3D line starting from (5, 10, 15).'
        },
        {
            code: `1.0 sphere (p x 5 *) glsl 1.0 1.0 hsv material march render`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: 'A shader using the position variable `p` to create a material.'
        }
    ]
};