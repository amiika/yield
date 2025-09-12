
import type { Operator } from '../../types';
import { mouseState } from '../../mouse-state';

export const mouse: Operator = {
    definition: {
        exec: function*(s) {
            s.push([mouseState.x, mouseState.y]);
        },
        description: 'Pushes the current mouse coordinates as a list `(x y)` onto the stack. In `glsl`, this becomes the `u_mouse` vec2 uniform. This operator is not available inside `bytebeat` or `floatbeat` quotations; use `(mousex mousey)` instead.',
        effect: '-> [x y]'
    },
    examples: [
        {
            code: 'mouse',
            assert: s => s.length === 1 && Array.isArray(s[0]) && s[0].length === 2 && typeof s[0][0] === 'number' && typeof s[0][1] === 'number',
            expectedDescription: 'A list containing the mouse [x, y] coordinates.'
        },
        {
            code: `
# A plane to act as a canvas
0 1 0 vec3 0 plane

# Create a material that ripples from the mouse cursor
(
  p xz mouse - # Calculate vector from surface point to normalized mouse
  length 50 * sin          # Create sine wave ripples
  dup dup vec3               # Make it grayscale
) glsl material

march
0 2 5 vec3 0 0 0 vec3 camera
render`,
            assert: s => s[0]?.type === 'shader' && s[0].code.includes('u_mouse'),
            expectedDescription: 'An interactive shader with ripples emanating from the mouse cursor.'
        }
    ]
};