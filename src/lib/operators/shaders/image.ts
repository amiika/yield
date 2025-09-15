
import type { Operator } from '../../types';

export const image: Operator = {
    definition: {
        exec: function*(s) {
            const quotation = s.pop();
            if (!Array.isArray(quotation)) {
                throw new Error('image operator expects a quotation.');
            }
            s.push({ type: 'image_material', quotation: quotation });
        },
        description: `Creates a 2D image shader definition. When used with 'render', it produces a 2D visual. When used with 'material', it applies the 2D pattern as a 3D texture using tri-planar mapping. Special variables 'p', 'uv', 't', 'u_resolution', and 'mouse' are available inside the quotation.`,
        effect: `[L_quotation] -> [image_material]`
    },
    examples: [
        {
            code: `# Standalone 2D image: A simple color gradient
(
  uv       # use the explicit uv operator for normalized coords
  dup x    # use uv.x for red
  swap y   # use uv.y for green
  0.5      # blue
  1.0      # alpha
  vec4
) image render`,
            assert: s => s[0]?.type === 'shader' && s[0].code.includes('vec4((gl_FragCoord.xy / u_resolution.xy).x, (gl_FragCoord.xy / u_resolution.xy).y, 0.5, 1.0)'),
            expectedDescription: 'A shader object that creates a color gradient.'
        },
        {
            code: `# As a material: Apply a Voronoi pattern to a 3D sphere
1.0 sphere
(
  uv 5.0 * t 0.5 * + # scale and animate coordinates
  worley              # get worley noise
  x                   # get distance to nearest point
  1.0 swap -          # invert for classic cell look
  dup dup 1.0 vec4 # make grayscale and add alpha
) image material
march render`,
            assert: s => s[0]?.type === 'shader' && s[0].code.includes('worley'),
            expectedDescription: 'A shader object with a sphere textured with animated Voronoi noise.'
        },
        {
            code: `# As a material: Draw a soft circle on a 3D box
1 1 1 vec3 box
(
  uv 0.5 -
  dup x swap y 0.0 vec3
  0.25 circle2d
  0.0 0.01 smoothstep neg 1.0 +
  dup dup 1.0 vec4
) image material
march render`,
            assert: s => s[0]?.type === 'shader' && s[0].code.includes('sdCircle2d'),
            expectedDescription: 'A shader object with a box textured with a soft circle.'
        },
        {
            code: `# As a material: Interactive psychedelic fluid effect on a torus
0.8 0.2 vec2 torus
(
  uv mouse 500.0 / t + +
  dup x sin
  swap y cos
  0.8 1.0 vec4
) image material
(t 0.2 *) glsl 1 1 1 vec3 rotatesdf
march render`,
            assert: s => s[0]?.type === 'shader' && s[0].code.includes('mouse'),
            expectedDescription: 'A shader object rendering a rotating torus with an interactive fluid material.'
        },
        {
            code: [
                `# Composing with glsl: Use a glsl expression as a value`,
                `1.0 sphere`,
                `(`,
                `  # Calculate a grayscale value using a glsl expression`,
                `  (p x p y * 5.0 * sin 0.5 * 0.5 +) glsl`,
                ``,
                `  # Use this value for all three color channels`,
                `  dup dup # -> [val, val, val]`,
                `  1.0     # alpha`,
                `  vec4`,
                `) image`,
                `material`,
                `march render`
            ],
            assert: s => s[0]?.type === 'shader' && s[0].code.includes('sin(((p.x * p.y) * 5.0))'),
            expectedDescription: 'A shader object with a material derived from a nested glsl expression.'
        }
    ]
};