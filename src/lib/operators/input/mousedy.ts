
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
# A static sphere
0.5 sphere

# A second sphere whose radius is controlled by the mousedown y-position
(mousedy) glsl sphere
0.5 0 0 vec3 translate

# Blend them together
0.1 smoothUnion

:blue material
march render`,
            assert: s => s[0]?.type === 'shader' && s[0].code.includes('u_moused'),
            expectedDescription: 'An interactive shader where dragging the mouse vertically controls the size of one of the spheres.'
        }
    ]
};