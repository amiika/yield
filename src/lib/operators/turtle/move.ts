import type { Operator } from '../../types';

export const move: Operator = {
    definition: {
        exec: function*() {
            throw new Error(`Operator 'move' can only be used inside a quotation for 'image' or 'march'.`);
        },
        description: `Moves the turtle forward. A negative number will move it backward. This is the primary operator for turtle movement and works in both 2D ('image') and 3D ('march') contexts.
- If the argument is a **number**, it moves by that absolute distance.
- If the argument is a **string**, it is parsed as a sequence of L-System commands:
  - **[A-Z]**: Move forward by the current step size, drawing a line if the pen is down.
  - **[a-z]**: Move forward by the current step size, without drawing.
  - **+**: Turn Left (2D) / Yaw Left (3D).
  - **-**: Turn Right (2D) / Yaw Right (3D).
  - **&**: Pitch Down (3D only).
  - **^**: Pitch Up (3D only).
  - **\\**: Roll Left (3D only).
  - **/**: Roll Right (3D only).
  - **|**: Turn 180 degrees.
  - **[**: Push current turtle state (position, orientation, etc.).
  - **]**: Pop and restore turtle state.
The rotation amount for +/-/&/^/\\// is set by the \`angle\` operator or the global \`:angle\` variable. The step size for letter commands is set by the \`forward\` operator.`,
        effect: `(in quotation) [distance_num | command_string] -> []`
    },
    examples: [
        {
            code: `((0 0 0) p 10 move) march render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader object rendering a 3D line."
        },
        {
            code: `( (0 0) p 10 forward "F+F-F" move ) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader object rendering a 2D path from a string, with a step size of 10."
        }
    ]
};