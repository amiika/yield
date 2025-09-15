
import type { Operator } from '../../types';
import { mouseState } from '../../mouse-state';

export const mousex: Operator = {
    definition: {
        exec: function*(s) {
            s.push(mouseState.x);
        },
        description: 'Pushes the current mouse X coordinate to the stack. In `glsl`, this becomes `u_mouse.x`. In `bytebeat`/`floatbeat`, it is the window X coordinate.',
        effect: '-> N'
    },
    examples: [
        { 
            code: 'mousex', 
            assert: s => typeof s[0] === 'number',
            expectedDescription: 'A number representing the mouse X coordinate.'
        },
        {
            code: `
# A simple theremin-like instrument where pitch is controlled by mouse-x
(
  # t is the time variable in floatbeat
  # mousex provides the window X coordinate
  t 44100 /           # Convert sample index to seconds
  mousex 2 * 220 +    # Map mouse x-coord to a frequency range (e.g., 220-...)
  * 2 * 3.14159 * sin # Calculate sine wave for the frequency
) 44100 floatbeat     # Run the formula at 44.1kHz
0.5 mul               # Apply gain
`,
            replCode: `
# A simple theremin-like instrument where pitch is controlled by mouse-x
(
  # t is the time variable in floatbeat
  # mousex provides the window X coordinate
  t 44100 /           # Convert sample index to seconds
  mousex 2 * 220 +    # Map mouse x-coord to a frequency range (e.g., 220-...)
  * 2 * 3.14159 * sin # Calculate sine wave for the frequency
) 44100 floatbeat     # Run the formula at 44.1kHz
0.5 mul               # Apply gain
start`,
            assert: s => s.length === 0,
            expectedDescription: 'An interactive audio graph where mouse X controls pitch.'
        }
    ]
};
