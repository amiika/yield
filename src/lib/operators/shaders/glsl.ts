

import type { Operator, StackValue } from '../../types';
import { transpileGLSL } from '../../utils';

export const glsl: Operator = {
    definition: {
        exec: function*(s) {
            const quotation = s.pop() as StackValue[];
            if (!Array.isArray(quotation)) throw new Error('glsl expects a quotation (list).');
            const transpiledCode = transpileGLSL(quotation);
            s.push({ type: 'glsl_expression', code: transpiledCode });
        },
        description: 'Transpiles a Yield quotation into a GLSL expression for use in procedural materials. Special operators `p` (position), `t` (time), and swizzlers (`x`, `y`, `xy`, etc.) are available inside the quotation.',
        effect: '[[Quotation]] -> [glsl_expression]'
    },
    examples: [
        {
            code: '(t sin 0.5 * 1.5 +) glsl 5.0 2.0 mandelbox 1.0 1.2 1.4 wavecolor material march render',
            assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        },
        {
            code: `(p x t + sin) glsl`,
            assert: s => s.length === 1 && s[0]?.type === 'glsl_expression' && s[0].code === 'sin((p.x + u_time))',
            expectedDescription: 'A glsl_expression object'
        },
        {
            code: `
# Use swizzling to create a diagonal color gradient
1 1 1 vec3 box
(
  p x p y + # Sum of x and y coordinates from position p
  2 *       # Scale for more color cycles
  1.0 1.0 hsv # Map value to hue
) glsl material
march render`,
            assert: s => s[0]?.type === 'shader',
            expectedDescription: 'A shader rendering a box with a diagonal rainbow material.'
        },
        {
            code: `
# Use swizzling and fract to create a repeating grid
0 1 0 vec3 0 plane # A horizontal plane
(
  p xy 5 * fract # Create a 5x5 grid of 0-1 coordinates
  dup x          # Use local x for red channel
  swap y         # Use local y for green channel
  0.5            # Static blue channel
  vec3
) glsl material
march
0 2 5 vec3 0 0 0 vec3 camera
render`,
            assert: s => s[0]?.type === 'shader',
            expectedDescription: 'A shader rendering a plane with a colorful repeating grid pattern.'
        },
        {
            code: `
# Use swizzling to create a conditional mask
0.8 0.2 vec2 torus
(
  p y 0.0 >    # Test if the position's y-coord is > 0
  (1 0 0 vec3) # If true, use red
  (0 0 1 vec3) # If false, use blue
  ?            # The 'ifte'/? operator works inside glsl
) glsl material
(t 0.5 *) glsl 1 0 0 vec3 rotatesdf # Rotate to see top/bottom
march
render`,
            assert: s => s[0]?.type === 'shader',
            expectedDescription: 'A shader rendering a torus that is red on top and blue on the bottom.'
        },
        {
            code: `
# Use .z for a depth-based gradient
0.2 sphere
2 2 2 vec3 repeat
(
  p z 0.1 * # Use the z-coordinate
  1.0 1.0 hsv
) glsl material
march
0 0 15 vec3 0 0 0 vec3 camera
render`,
            assert: s => s[0]?.type === 'shader',
            expectedDescription: 'A shader rendering an infinite grid of spheres that change color with depth.'
        },
        {
            code: `
# Use .yz to project stripes onto the side of a cylinder
0.5 1.5 vec2 cylinder
(
  p yz 10 * x sin # Project to YZ plane, scale, get sine
  dup dup vec3    # Make grayscale
) glsl material
(t 0.5 *) glsl 1 0 0 vec3 rotatesdf # Rotate to see the effect
march render`,
            assert: s => s[0]?.type === 'shader',
            expectedDescription: 'A shader rendering a cylinder with vertical stripes projected onto its side.'
        },
        {
            code: `
# Use .xz to project a checkerboard
2.0 0.25 0.25 vec3 box
(
  p xz 5 *     # Project to XZ plane and scale coordinates
  dup          # stack: [scaled_uv, scaled_uv]
  x floor      # stack: [scaled_uv, floor(u)]
  swap         # stack: [floor(u), scaled_uv]
  y floor      # stack: [floor(u), floor(v)]
  + 2 %        # Create checkerboard pattern
  dup dup vec3
) glsl material
(t 1.0 *) glsl 1 1 0 vec3 rotatesdf
march render`,
            assert: s => s[0]?.type === 'shader',
            expectedDescription: 'A shader rendering a torus with a checkerboard pattern on its top and bottom faces.'
        },
        {
            code: `
# Use .zxy to warp a 3D noise texture
0.8 0.8 0.2 vec3 box
(
  p zxy 3 * t + fbm # fbm returns a float
  dup dup vec3      # convert float to vec3 for color
) glsl material
(t 0.3 *) glsl 1 1 1 vec3 rotatesdf
march render`,
            assert: s => s[0]?.type === 'shader',
            expectedDescription: 'A shader rendering a rotating box with an animated, warped FBM noise texture.'
        },
        {
            code: `
# Use .zyx to apply a reversed gradient to a mirrored object
0.4 sphere 0.5 0 0 vec3 translate
1 1 1 vec3 mirrorRepeat
(
  p zyx 0.3 * x # hue must be a float
  1.0 1.0 hsv
) glsl material
march
0 0 5 vec3 0 0 0 vec3 camera
render`,
            assert: s => s[0]?.type === 'shader',
            expectedDescription: 'A shader showing how swizzling coordinates also mirrors the applied texture.'
        },
        {
            code: `
# Use .w swizzles by constructing a vec4
1.0 sphere
(
  # Create a vec4 from (pos.x, pos.y, p.z, time)
  # The RPN for this is p.x, p.y, p.z, t -> vec4
  p x p y p z t vec4
  
  # Use .w (time) and .z (depth) to make a more obvious animation
  dup w 2.0 *         # Get time, speed it up for visibility
  swap z +            # Add depth to create a diagonal wave
  1.0 1.0 hsv         # Use the combined value as the hue
) glsl material
march 
0 0 5 vec3 0 0 0 vec3 camera
render`,
            assert: s => s[0]?.type === 'shader',
            expectedDescription: 'A shader showing a sphere whose color changes with both time and depth.'
        },
        {
            code: `
# Combine swizzles: radial (.xy) and vertical (.z) patterns
0.1 circle2d # The shape to repeat
5.0 polarRepeat
(
  p xy length 5 * sin # sine wave from center
  p z 5 * sin *       # modulated by vertical sine wave
  0.5 + 0.5 *         # remap to 0-1 range
  dup dup vec3
) glsl material
(t 0.2 *) glsl 1 0 0 vec3 rotatesdf
march render`,
            assert: s => s[0]?.type === 'shader',
            expectedDescription: 'A shader showing a ring of cylinders with a complex, pulsating interference pattern.'
        },
        {
            code: `
# Use .xzy to displace a surface
0 1 0 vec3 1.0 plane
(
  p xzy 5 * t + snoise # Use snoise for signed displacement
  0.1 *
) glsl displace
(
  p yzx x 1.0 1.0 hsv
) glsl material
(t 0.2 *) glsl 1 0 0 vec3 rotatesdf
march 
0 2 5 vec3 0 0 0 vec3 camera
render`,
            assert: s => s[0]?.type === 'shader',
            expectedDescription: 'A shader rendering a plane with a complex, animated displacement and warped coloring.'
        },
        {
            code: `
# Rectangular repeat with .xz swizzle
0.1 sphere
2 2 vec2 0.5 rectangularRepeat
(
  p xz 2 * fract # Project grid onto the XZ plane
  dup x swap y * # Correctly get x and y components
  5 *            # Multiply components for interesting pattern
  1.0 1.0 hsv
) glsl material
march 
0 2 5 vec3 0 0 0 vec3 camera
render`,
            assert: s => s[0]?.type === 'shader',
            expectedDescription: 'A shader rendering a rectangular frame of spheres with a colorful grid pattern.'
        },
        {
            code: `
# Another 3D warp with .yzx
0.4 sphere 
0.3 0.3 0.3 vec3 box 0.4 0 0 vec3 translate
0.1 roundUnion
(
  p yzx 3 * t + cnoise dup dup vec3
) glsl material
(t 0.3 *) glsl 1 1 1 vec3 rotatesdf
march render`,
            assert: s => s[0]?.type === 'shader',
            expectedDescription: 'A shader rendering a rounded object with a unique warped noise pattern.'
        },
        {
            code: `
# Use .wwww swizzle to create a vec4 from a single component
1.0 sphere
(
  # Create a vec4 from (pos.x, pos.y, p.z, time)
  p x p y p z t vec4
  
  # Get time via .w and create a solid color from it.
  w                # get time, discard original vec4
  dup dup dup vec4 # -> vec4(t, t, t, t)
  
  # Take the .xyz for the color, making it flash uniformly
  xyz
) glsl material
march render`,
            assert: s => s[0]?.type === 'shader',
            expectedDescription: 'A shader rendering a sphere that flashes uniformly based on time using .wwww swizzle.'
        },
        {
            code: `
# Use .xx swizzle to create a vec2 from a single component
# This creates horizontal lines from a noise pattern.
1.0 sphere
(
  p xy xx # -> vec2(p.x, p.x)
  5 *     # Scale it
  fbm     # Get noise
  dup dup vec3
) glsl material
march render`,
            assert: s => s[0]?.type === 'shader',
            expectedDescription: 'A shader rendering a sphere with a horizontal noise pattern using .xx swizzle.'
        },
        {
            code: `
# Use .y to create a grayscale color from height
0.8 0.2 vec2 torus
(
  p y         # Get y-coordinate (height)
  0.5 * 0.5 + # Remap range from [-0.2, 0.2] to [0.4, 0.6]
  dup dup vec3  # Create a grayscale vector from the value
) glsl material
march render`,
            assert: s => s[0]?.type === 'shader',
            expectedDescription: 'A shader rendering a torus with a grayscale pattern based on the y-coordinate.'
        }
    ]
};
