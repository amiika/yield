
import type { TutorialSection } from './types';

export const turtleGraphics: TutorialSection = {
    name: "Turtle Graphics: Drawing with GLSL",
    description: "Yield includes a modern, shader-based turtle graphics system. Commands are placed inside a quotation, which is then passed to a rendering combinator (`image` for 2D, `march` for 3D) to produce a visual.",
    cells: [
        {
            name: "Drawing a Square",
            description: "The `p` operator consumes a vector from the quotation's internal stack to initialize the turtle's state. The `image` operator interprets the entire quotation and prepares it for the `render` operator.",
            example: `(
  0 -50 vec2 p
  100 move 90 right
  100 move 90 right
  100 move 90 right
  100 move
) image render`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: "A shader object rendering a white square."
        },
        {
            name: "Color and Pen Control",
            description: "You can change the turtle's pen color with `setpencolor` and lift or lower the pen with `penup` and `pendown`. This allows for creating drawings with multiple colors and disconnected parts.",
            example: `(
  0 0 vec2 p
  50 move
  255 0 0 setpencolor
  90 right
  50 move
  penup
  90 right
  25 move
  pendown
  0 255 0 setpencolor
  50 move
) image render`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: "A multi-colored, L-shaped drawing."
        },
        {
            name: "3D Turtle Graphics",
            description: "You can draw in 3D using a similar workflow. Initialize with a 3D vector. The `march` operator interprets the 3D turtle quotation and builds a `scene` object, which `render` then displays.",
            example: `(
  0 0 0 vec3 p
  (10 move 10 yaw 5 pitch) 36 times
) march render`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: "A shader object rendering a 3D spiral tube."
        },
        {
            name: "L-System: Fractal Plant",
            description: "Turtle graphics are a natural fit for Lindenmayer Systems (L-Systems). The `rewrite` operator can generate a command string based on rules. The `forward` operator sets the step size for the `move` operator's L-System string parser, while `angle` sets the rotation amount for string commands.",
            example: `
"F+[[X]-X]-F[-FX]+X" X =
"FF" F =
"X" 5 rewrite :plant_string =
(
  0 -150 vec2 p
  90 setheading
  25 angle
  4 forward
  :plant_string body move
) image render
`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: "A shader rendering a fractal plant."
        },
        {
            name: "L-System: Peano-Gosper Curve",
            description: "Generates the Peano-Gosper curve, a space-filling curve. This example uses two rules, `F` and `G`.",
            example: `
"F+G++G-F--FF-G+" F =
"-F+GG++G+F--F-G" G =
"F" 3 rewrite :curve =
(
  100 0 vec2 p
  60 angle
  10 forward
  :curve body move
) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader rendering the Peano-Gosper curve."
        },
        {
            name: "L-System: Cross Fractal",
            description: "Generates a cross-like fractal pattern.",
            example: `
"F-F+F+FF-F-F+F" F =
"F-F-F-F" 4 rewrite :curve =
(
  0 0 vec2 p
  90 angle
  10 forward
  :curve body move
) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader rendering a cross fractal."
        },
        {
            name: "L-System: Branch Fractal",
            description: "A branching fractal that resembles a plant or tree.",
            example: `
"F-[[G]+G]+F[+FG]-G" G =
"FF" F =
"G" 4 rewrite :curve =
(
  0 -200 vec2 p
  90 setheading
  22.5 angle
  10 forward
  :curve body move
) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader rendering a branching fractal."
        },
        {
            name: "L-System: 32-Segment Curve",
            description: "Generates a complex, space-filling curve with a single rewriting rule.",
            example: `
"-F+F-F-F+F+FF-F+F+FF+F-F-FF+FF-FF+F+F-FF-F-F+FF-F-F+F+F-F+" F =
"F+F+F+F" 3 rewrite :curve =
(
  0 0 vec2 p
  90 angle
  10 forward
  :curve body move
) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader rendering a 32-segment curve."
        },
        {
            name: "L-System: Sierpinski Arrowhead",
            description: "Generates the Sierpinski arrowhead curve using two rules, `F` and `G`.",
            example: `
"G+F+G" F =
"F-G-F" G =
"F" 6 rewrite :curve =
(
  -200 -200 vec2 p
  60 angle
  10 forward
  :curve body move
) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader rendering the Sierpinski arrowhead curve."
        },
        {
            name: "L-System: Koch Snowflake",
            description: "Generates the classic Koch snowflake fractal.",
            example: `
"F+F--F+F" F =
"F--F--F" 4 rewrite :curve =
(
  0 150 vec2 p
  60 angle
  5 forward
  :curve body move
) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader rendering the Koch snowflake."
        },
        {
            name: "L-System: Hilbert Curve",
            description: "Generates a Hilbert curve, a continuous space-filling curve, using `L` and `R` rules.",
            example: `
"+RF-LFL-FR+" L =
"-LF+RFR+FL-" R =
"L" 5 rewrite :curve =
(
  -200 -200 vec2 p
  90 angle
  10 forward
  :curve body move
) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader rendering the Hilbert curve."
        },
        {
            name: "3D L-System: Simple Plant",
            description: "A simple 3D branching structure generated with an L-System. The `forward` operator sets the step size for `move`, while the `angle` operator sets the rotation amount for string commands.",
            example: `
25.7 :angle =
"F[+F]F[-F]F" F =
"F" 4 rewrite :plant_string =
(
  0 -1.5 0 vec3 p
  -90 pitch # Start by pointing up
  1 forward
  :plant_string body move
) march
# Scene setup
-2 2 4 vec3 "white" 0.05 light
2 -2 -4 vec3 "white" 0.05 light
0 0 5 vec3 0 0 0 vec3 camera
render
`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: "A shader rendering a 3D branching plant."
        },
        {
            name: "3D L-System: Twisting Plant",
            description: "This L-System adds roll commands (\\ and /) to create a twisting, vine-like structure.",
            example: `
"F[\\X][//+X]FX" X =
"FF" F =
"X" 5 rewrite :plant_string =
(
  0 -1.5 0 vec3 p
  -90 pitch # Point up
  20 angle
  0.5 forward
  :plant_string body move
) march
# Scene setup
-2 2 4 vec3 "white" 0.05 light
0 0 5 vec3 0 0 0 vec3 camera
render
`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: "A shader rendering a twisting 3D plant."
        },
        {
            name: "3D L-System: Bush",
            description: "A simple 3D L-System that generates a bush-like structure using branching and rolling.",
            example: `
22.5 :angle =
"F[/X][\\\\X]F" X =
"FF" F =
"X" 4 rewrite :bush =
(
  0 -1.5 0 vec3 p
  -90 pitch
  1 forward
  :bush body move
) march
-2 2 4 vec3 "white" 0.05 light
0 0 5 vec3 0 0 0 vec3 camera
render
`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: "A shader rendering a 3D bush."
        },
        {
            name: "3D L-System: Hilbert-like Curve",
            description: "A 3D L-System that generates a fractal, space-filling curve. Note the use of multiple rotation commands.",
            example: `
"^[-F+F+F]+F-&[-F+F+F]+[F-F+F^]" F =
"F" 3 rewrite :hilbert3d =
(
  0 0 0 vec3 p
  90 angle
  1 forward
  :hilbert3d body move
) march
-5 5 10 vec3 "white" 0.05 light
0 0 15 vec3 0 0 0 vec3 camera
render
`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: "A shader rendering a complex 3D space-filling curve."
        }
    ]
};
