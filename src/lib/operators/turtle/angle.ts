import type { Operator } from '../../types';

export const angle: Operator = {
    definition: {
        exec: function*() {
            throw new Error(`Operator 'angle' can only be used inside a quotation for 'image' or 'march'.`);
        },
        description: `Sets the default rotation angle (in degrees) for all subsequent turtle string notation commands (+, -, /, etc.). This is particularly useful for controlling the look of L-Systems.`,
        effect: `(in quotation) [degrees] -> []`
    },
    examples: [
        {
            code: `(
  (0 -50) p
  100 forward
  45 angle
  "F+F" move
) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader object rendering a large 45-degree corner."
        },
        {
            replCode: `
"f+f--f+f" f =
"f--f--f" 4 rewrite :curve =
(
  0 150 vec2 p
  60 angle      # Set angle for the Koch snowflake
  5 forward     # Set step size
  :curve body move
) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader rendering the Koch snowflake, where 'angle' sets the turning degree."
        }
    ]
};