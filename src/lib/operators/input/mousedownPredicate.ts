
import type { Operator } from '../../types';
import { isMouseDownState } from '../../mouse-state';

export const mousedPredicate: Operator = {
    definition: {
        exec: function*(s) {
            s.push(isMouseDownState.down);
        },
        description: 'Pushes `true` if the mouse button is currently pressed down, `false` otherwise. In `glsl`, this provides the mouse button state as a float (1.0 if down, 0.0 if up).',
        effect: '-> [bool|float]'
    },
    examples: [
        {
            code: `
# A sphere that changes color when the mouse is pressed
1.0 sphere
(
  moused?      # test condition
  (1.0 0.0 0.0 vec3) # true: red
  (0.0 1.0 0.0 vec3) # false: green
  ?                # ifte
) glsl material
march render`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: `A shader object rendering a sphere that turns from green to red when the mouse button is held down.`
        },
        {
            replCode: `# A helper word to send a control message. ctrl now cleans the stack.
(rolldown ctrl) :send =>

# 1. Define the synth patch with controllable freq and amp.
:freq note sine :amp mul :theremin-patch =

# 2. Play the synth once; it starts silently.
:theremin :theremin-patch start

# 3. Define the control loop.
(
  # Calculate amplitude: 0.5 if mouse is down, 0 otherwise.
  moused? 0.5 0 ?
  :theremin :amp :send

  # Calculate frequency based on mouse x position.
  mousex 2 * 220 +
  :theremin :freq :send
) 0.05 live :mouse_theremin =>
:mouse_theremin`,
            async: {
                duration: 600,
                assert: (s, dict) => dict[':mouse_theremin'] !== undefined,
                assertDescription: "The :mouse_theremin function should be defined."
            }
        }
    ]
};
