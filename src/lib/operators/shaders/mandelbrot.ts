import type { Operator } from '../../types';
import { toGLSL } from './glsl-generator';

export const mandelbrot: Operator = {
    definition: {
        exec: function*(s) {
            const r = s.pop();
            s.push({ type: 'color', expression: `vec3(mandelbrotSDF(p.xy, ${toGLSL(r)}))` });
        },
        description: `A convenient high-level operator that creates a complete grayscale Mandelbrot set material. It takes an 'r' parameter (a float) which controls the radius/zoom.`,
        effect: '[r_float] -> [color]'
    },
    examples: [
        {
            code: `
2.0 sphere
  1.5  # radius
  mandelbrot
material
march render`,
            assert: s => s[0]?.type === 'shader',
            expectedDescription: 'A shader object with a sphere textured with a classic Mandelbrot set.'
        },
        {
            code: `
# A deep, animated zoom into the Mandelbrot set
2.0 sphere
  # Animate the radius 'r' for a zoom effect
  (t 0.1 * sin abs) glsl 0.95 * 0.05 +
  mandelbrot
material
march render`,
            assert: s => s[0]?.type === 'shader',
            expectedDescription: 'A shader object with a sphere textured with an animated, zooming Mandelbrot set.'
        }
    ]
};
