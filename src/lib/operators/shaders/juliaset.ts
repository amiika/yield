

import type { Operator } from '../../types';
import { toGLSL } from './glsl-generator';

export const juliaset: Operator = {
    definition: {
        exec: function*(s) {
            const r = s.pop();
            const c = s.pop();
            const st = s.pop();

            const st_code = toGLSL(st);
            const c_code = toGLSL(c);
            const r_code = toGLSL(r);

            if (!st_code || !c_code || !r_code) {
                s.push(st, c, r); // Push back args on failure
                throw new Error('juliaset expects st (vec2/glsl), c (vec2/glsl), and r (float/glsl) on the stack.');
            }
            
            const expression = `juliaSDF(${st_code}, ${c_code}, ${r_code})`;
            
            s.push({ 
                type: 'glsl_expression', 
                code: expression,
                returnType: 'float'
            });
        },
        description: `Calculates the raw 2D Julia set fractal value (a float from 0.0 to 1.0) and pushes it to the stack as a GLSL expression. This is the building block for creating custom, animated 2D fractal materials. It requires the surface coordinates ('st'), the 'c' constant, and a radius/zoom 'r'. For a 3D fractal, see 'mandelbulb' or 'fractal'.`,
        effect: '[st_vec2 c_vec2 r_float] -> [glsl_expression]'
    },
    examples: [
        {
            code: `
# Use a plane as a canvas for the 2D fractal
0 0 1 vec3 0 plane

# --- Create the animated, colorful material ---

# 1. Calculate the Julia set value as a GLSL expression
(p xy) glsl
(t 0.2 * sin 0.7885 * t 0.2 * cos 0.7885 * vec2) glsl # Animated C
(t 0.1 * sin abs) glsl 0.95 * 0.05 +                         # Animated R (deep zoom)
juliaset                                                     # -> [fractal_val_expr]

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
            expectedDescription: 'A shader object with a plane textured with a deeply-zooming, color-cycling Julia set.'
        }
    ]
};