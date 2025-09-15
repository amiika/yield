
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
# A single circle
0.5 circle2d

# Its X position is controlled by the mousedrag x-position
# We normalize the coordinate to be in a [-2.5, 2.5] range
(
  (mousedx width / 0.5 -) 5.0 * # x
  0.0                           # y
  0.0                           # z
  vec3
) glsl
translate

:red material
march render`,
            assert: s => s[0]?.type === 'shader' && s[0].code.includes('u_moused'),
            expectedDescription: 'An interactive shader where clicking and dragging the mouse horizontally moves a circle left and right.'
        }
    ]
};
