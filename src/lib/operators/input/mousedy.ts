
import type { Operator } from '../../types';
import { mouseDownState } from '../../mouse-state';

export const mousedy: Operator = {
    definition: {
        exec: function*(s) {
            s.push(mouseDownState.y);
        },
        description: 'Pushes the Y coordinate from the last mousedown event. The value is updated on `mousedown` and while dragging. In `glsl`, this becomes `u_moused.y`. In `bytebeat`/`floatbeat`, it is the window Y coordinate.',
        effect: '-> N'
    },
    examples: [
        { 
            code: 'mousedy', 
            assert: s => typeof s[0] === 'number',
            expectedDescription: 'A number representing the mousedown Y coordinate.'
        },
        {
            code: `
# A single circle
0.5 circle2d

# Its Y position is controlled by the mousedrag y-position
# We normalize the coordinate to be in a [-2.5, 2.5] range
(
  0.0                             # x
  (mousedy height / 0.5 -) 5.0 * # y
  0.0                             # z
  vec3
) glsl
translate

:blue material
march render`,
            assert: s => s[0]?.type === 'shader' && s[0].code.includes('u_moused'),
            expectedDescription: 'An interactive shader where clicking and dragging the mouse vertically moves a circle up and down.'
        }
    ]
};
