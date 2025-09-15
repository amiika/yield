
import type { Operator } from '../../types';
import { mouseState } from '../../mouse-state';

export const mousey: Operator = {
    definition: {
        exec: function*(s) {
            s.push(mouseState.y);
        },
        description: 'Pushes the current mouse Y coordinate to the stack. In `glsl`, this becomes `u_mouse.y`. In `bytebeat`/`floatbeat`, it is the window Y coordinate.',
        effect: '-> N'
    },
    examples: [
        { 
            code: 'mousey', 
            assert: s => typeof s[0] === 'number',
            expectedDescription: 'A number representing the mouse Y coordinate.'
        },
        {
            code: `
# A simple theremin-like instrument where volume is controlled by mouse-y
(
  # A static 440Hz sine wave tone
  t 44100 / 440 * 2 * 3.14159 * sin
  
  # Calculate gain from mouse-y, inverting so up=louder
  # and clamping to a safe 0-1 range
  1.0 mousey 800 / - 0.0 1.0 clamp
  
  # Apply gain
  *
) 44100 floatbeat
`,
            replCode: `
# A simple theremin-like instrument where volume is controlled by mouse-y
(
  # A static 440Hz sine wave tone
  t 44100 / 440 * 2 * 3.14159 * sin
  
  # Calculate gain from mouse-y, inverting so up=louder
  # and clamping to a safe 0-1 range
  1.0 mousey 800 / - 0.0 1.0 clamp
  
  # Apply gain
  *
) 44100 floatbeat start
`,
            assert: s => s.length === 0,
            expectedDescription: 'Stack should be empty after playing.'
        }
    ]
};