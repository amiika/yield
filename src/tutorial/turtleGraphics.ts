
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
  100 forward 90 right
  100 forward 90 right
  100 forward 90 right
  100 forward
) image render`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: "A shader object rendering a white square."
        },
        {
            name: "Color and Pen Control",
            description: "You can change the turtle's pen color with `setpencolor` and lift or lower the pen with `penup` and `pendown`. This allows for creating drawings with multiple colors and disconnected parts.",
            example: `(
  0 0 vec2 p
  50 forward
  255 0 0 setpencolor
  90 right
  50 forward
  penup
  90 right
  25 forward
  pendown
  0 255 0 setpencolor
  50 forward
) image render`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: "A multi-colored, L-shaped drawing."
        },
        {
            name: "3D Turtle Graphics",
            description: "You can draw in 3D using a similar workflow. Initialize with a 3D vector. The `march` operator interprets the 3D turtle quotation and builds a `scene` object, which `render` then displays.",
            example: `(
  (0 0 0) p
  (10 move 10 yaw 5 pitch) 36 times
) march render`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: "A shader object rendering a 3D spiral tube."
        },
        {
            name: "L-System: Fractal Plant",
            description: "Turtle graphics are a natural fit for Lindenmayer Systems (L-Systems). The `rewrite` operator can generate a command string based on rules, which can then be drawn. The `angle` operator allows you to explicitly set the rotation amount for string commands, providing more creative control.",
            replCode: `
"F+[[X]-X]-F[-FX]+X" X =
"FF" F =
"X" 5 rewrite :plant_string =
(
  (0 -150) p
  90 setheading
  25 angle
  :plant_string body forward
) image render
`,
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
            expectedDescription: "A shader rendering a fractal plant."
        },
        {
            name: "L-System: Peano-Gosper Curve",
            description: "Generates the Peano-Gosper curve, a space-filling curve. This example uses two rules, `f` and `g`.",
            replCode: `
"f+g++g-f--ff-g+" f =
"-f+gg++g+f--f-g" g =
"f" 4 rewrite :curve =
(
  -200 100 p
  60 angle
  :curve body forward
) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader rendering the Peano-Gosper curve."
        },
        {
            name: "L-System: Cross Fractal",
            description: "Generates a cross-like fractal pattern.",
            replCode: `
"f-f+f+ff-f-f+f" f =
"f-f-f-f" 4 rewrite :curve =
(
  (0 0) p
  90 angle
  :curve body forward
) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader rendering a cross fractal."
        },
        {
            name: "L-System: Branch Fractal",
            description: "A branching fractal that resembles a plant or tree.",
            replCode: `
"f-[[g]+g]+f[+fg]-g" g =
"ff" f =
"g" 4 rewrite :curve =
(
  (0 -200) p
  90 setheading
  22.5 angle
  :curve body forward
) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader rendering a branching fractal."
        },
        {
            name: "L-System: 32-Segment Curve",
            description: "Generates a complex, space-filling curve with a single rewriting rule.",
            replCode: `
"-F+F-F-F+F+FF-F+F+FF+F-F-FF+FF-FF+F+F-FF-F-F+FF-F-F+F+F-F+" F =
"F+F+F+F" 3 rewrite :curve =
(
  (0 0) p
  90 angle
  :curve body forward
) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader rendering a 32-segment curve."
        },
        {
            name: "L-System: Sierpinski Arrowhead",
            description: "Generates the Sierpinski arrowhead curve using two rules.",
            replCode: `
"g+f+g" f =
"f-g-f" g =
"f" 6 rewrite :curve =
(
  (-200 -200) p
  60 angle
  :curve body forward
) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader rendering the Sierpinski arrowhead curve."
        },
        {
            name: "L-System: Koch Snowflake",
            description: "Generates the classic Koch snowflake fractal.",
            replCode: `
"f+f--f+f" f =
"f--f--f" 4 rewrite :curve =
(
  (0 150) p
  60 angle
  :curve body forward
) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader rendering the Koch snowflake."
        },
        {
            name: "L-System: Hilbert Curve",
            description: "Generates a Hilbert curve, a continuous space-filling curve.",
            replCode: `
"+rf-lfl-fr+" l =
"-lf+rfr+fl-" r =
"l" 5 rewrite :curve =
(
  (-200 -200) p
  90 angle
  :curve body forward
) image render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: "A shader rendering the Hilbert curve."
        }
    ]
};