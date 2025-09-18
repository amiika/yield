
import type { Operator } from '../../types';
import { interpretAndBuild2DTurtle, isTurtleQuotation } from '../turtle/interpreter';
import { generateTurtleShader, generateImageShaderFromQuotation } from './glsl-generator';

export const image: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const quotation = s.pop();
            if (!Array.isArray(quotation)) {
                throw new Error('image operator expects a quotation.');
            }

            if (isTurtleQuotation(quotation)) {
                // It's a turtle program. Interpret it to get the turtle object with its path.
                const turtleObject = yield* interpretAndBuild2DTurtle(quotation, options, evaluate);
                // Then, generate the GLSL shader code from the turtle object's path.
                const shaderCode = generateTurtleShader(turtleObject);
                s.push({ type: 'shader', code: shaderCode });
            } else {
                // It's a regular image material program.
                s.push({ type: 'image_material', quotation: quotation });
            }
        },
        description: `Creates a 2D image shader definition or a 2D turtle drawing. 
- If the quotation contains GLSL operators, it creates an \`image_material\` for texturing 3D objects.
- If the quotation contains 2D turtle operators ('forward', 'left', etc.), it interprets the drawing program and returns a final, renderable 2D shader.`,
        effect: `[L_quotation] -> [image_material | shader]`
    },
    examples: [
        {
            code: `# Standalone 2D Turtle Drawing
( 0 0 vec2 p 50 move 90 right 50 move ) image render`,
            assert: s => s[0]?.type === 'shader' && s[0].code.includes('sdRoundedSegment2D'),
            expectedDescription: 'A shader object that renders a 2D turtle drawing.'
        },
        {
            code: `# As a material: Apply a Voronoi pattern to a 3D sphere
1.0 sphere
(
  uv 5.0 * t 0.5 * + # scale and animate coordinates
  worley              # get worley noise
  x                   # get distance to nearest point
  1.0 swap -          # invert for classic cell look
  dup dup vec3 1.0 vec4 # make grayscale and add alpha
) image material
march render`,
            assert: s => s[0]?.type === 'shader' && s[0].code.includes('worley'),
            expectedDescription: 'A shader object with a sphere textured with animated Voronoi noise.'
        },
    ]
};