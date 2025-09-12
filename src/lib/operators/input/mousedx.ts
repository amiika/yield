
import type { Operator } from '../../types';
import { mouseDownState } from '../../mouse-state';

export const mousedx: Operator = {
    definition: {
        exec: function*(s) {
            s.push(mouseDownState.x);
        },
        description: 'Pushes the X coordinate from the last mousedown event. The value is updated on `mousedown` and while dragging. In `glsl`, this becomes `u_moused.x`. In `bytebeat`/`floatbeat`, it is the window X coordinate.',
        effect: '-> N'
    },
    examples: [
        { 
            code: 'mousedx', 
            assert: s => typeof s[0] === 'number',
            expectedDescription: 'A number representing the mousedown X coordinate.'
        },
        {
            code: `
# Two spheres that will be blended
0.5 sphere
0.5 sphere 0.5 0 0 vec3 translate

# The smoothness of their union is controlled by the mousedown x-position
(mousedx) glsl
smoothUnion

:red material
march render`,
            assert: s => s[0]?.type === 'shader' && s[0].code.includes('u_moused'),
            expectedDescription: 'An interactive shader where dragging the mouse horizontally controls the smoothness of the blend between two spheres.'
        }
    ]
};