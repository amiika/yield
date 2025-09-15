
import type { Operator } from '../../types';
import { mouseDownState } from '../../mouse-state';

export const moused: Operator = {
    definition: {
        exec: function*(s) {
            s.push([mouseDownState.x, mouseDownState.y]);
        },
        description: 'Pushes the mouse coordinates from the last mousedown event as a list `(x y)`. The value is updated on `mousedown` and while dragging. In `glsl`, this becomes the `u_moused.xy` vec2 uniform.',
        effect: '-> [x y]'
    },
    examples: [
        {
            code: 'moused',
            assert: s => s.length === 1 && Array.isArray(s[0]) && s[0].length === 2 && typeof s[0][0] === 'number' && typeof s[0][1] === 'number',
            expectedDescription: 'A list containing the mousedown [x, y] coordinates.'
        },
        {
            code: `
# An interactive Julia set explorer.
# Click and drag to change the 'c' parameter of the fractal.
2.0 sphere

# Create the material for the interactive Julia set
(
    # The surface coordinates for the fractal
    (p xy) glsl
    
    # The 'c' parameter, controlled by the mousedown position normalized to [-1, 1]
    (moused (width height vec2) / 0.5 - 2.0 *) glsl
    
    # The radius/zoom level
    1.0
    
    # Generate the raw fractal value
    juliaset
    
    # Make it colorful and animated
    (t 0.2 *) glsl + # Animate hue
    1.0 1.0 hsv
) glsl material

march render`,
            assert: s => s[0]?.type === 'shader' && s[0].code.includes('u_moused'),
            expectedDescription: 'An interactive shader where clicking and dragging explores different parts of the Julia set fractal.'
        }
    ]
};
