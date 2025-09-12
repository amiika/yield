
import type { Operator } from '../../types';
import { toGLSL } from './glsl-generator';

export const mandelbrotset: Operator = {
    definition: {
        exec: function*(s) {
            const r = s.pop();
            const st = s.pop();

            const st_code = toGLSL(st);
            const r_code = toGLSL(r);

            if (!st_code || !r_code) {
                s.push(st, r); // Push back args on failure
                throw new Error('mandelbrotset expects st (vec2/glsl) and r (float/glsl) on the stack.');
            }
            
            const expression = `mandelbrotSDF(${st_code}, ${r_code})`;
            
            s.push({ 
                type: 'glsl_expression', 
                code: expression,
                returnType: 'float'
            });
        },
        description: `Calculates the raw 2D Mandelbrot set fractal value (a float from 0.0 to 1.0) and pushes it to the stack as a GLSL expression. This is the building block for creating custom, animated 2D fractal materials. It requires the surface coordinates ('st') and a radius/zoom 'r'. For a high-level material, see 'mandelbrot'.`,
        effect: '[st_vec2 r_float] -> [glsl_expression]'
    },
    examples: [
        {
            code: `
# Use a plane as a canvas for the 2D fractal
0 0 1 vec3 0 plane

# --- Create the interactive, colorful material ---

# 1. Calculate the Mandelbrot set value as a GLSL expression
(p xy) glsl
(mousey u_resolution y / 5.0 * neg exp) glsl # Zoom with the mouse
mandelbrotset                                # -> [fractal_val_expr]

# 2. Use the fractal value to create a hue, and animate it
3.0 *           # Scale the value for more color range
(t 0.2 *) glsl + # Animate a hue shift over time

# 3. Create the final color
1.0 1.0         # Saturation and Value
hsv             # -> [color_object]

# Apply the final material and render
material
march
render`,
            assert: s => s[0]?.type === 'shader',
            expectedDescription: 'A shader object with a plane textured with a color-cycling Mandelbrot set that can be zoomed using the mouse.'
        }
    ]
};
