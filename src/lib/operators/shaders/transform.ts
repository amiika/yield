
import type { Operator } from '../../types';
import { createMarchingObject, isMarchingObject, isMatrix } from '../../utils';

export const transform: Operator = {
    definition: {
        exec: function*(s) {
            const matrix = s.pop();
            const sdf = s.pop();
            
            if (!isMarchingObject(sdf)) {
                throw new Error('transform expects an SDF object on the stack.');
            }

            if (isMatrix(matrix)) {
                const rows = matrix.length;
                const cols = matrix[0]?.length ?? 0;

                if ((rows !== 3 && rows !== 4) || rows !== cols) {
                    throw new Error('transform matrix must be a square 3x3 or 4x4 matrix.');
                }
            } else if (matrix?.type === 'glsl_expression') {
                if (matrix.returnType !== 'mat3' && matrix.returnType !== 'mat4') {
                     throw new Error(`glsl_expression used with transform must have a returnType of 'mat3' or 'mat4'.`);
                }
                // This is a valid dynamic matrix, proceed.
            } else {
                throw new Error('transform expects a matrix or a matrix-returning glsl_expression on the stack.');
            }
            
            s.push(createMarchingObject('transform', 'transformation', [sdf], { matrix }));
        },
        description: `Applies a matrix transformation to an SDF object. The matrix must be 3x3 (for rotations/scaling) or 4x4 (for affine transformations including translation).`,
        effect: `[sdfA matrix] -> [sdfB]`
    },
    examples: [{
        code: `
# Create a box
0.4 0.4 0.4 vec3 box

# Create a dynamic scaling matrix that pulses along the X-axis
(t sin 0.5 * 1 +) glsl # sx: pulses between 0.5 and 1.5
1.0                     # sy: static
1.0                     # sz: static
scalemat

# Apply the dynamic matrix
transform

# Animate the object's rotation as well for a better effect
(t 0.5 *) glsl 0 1 0 vec3 rotatesdf

# Render the scene
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a box that pulses horizontally over time.'
    }, {
        code: `
# A sheared box, impossible with standard operators
1 0.5 0  0 1 0  0 0 1
3 mat

# Apply the shear matrix to a box
0.5 0.5 0.5 vec3 box swap transform

# Render the scene
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a sheared box.'
    },
    {
        code: `
# A sphere to be squashed
1 sphere
# Apply non-uniform scaling
1.5 0.5 1.0 scalemat transform
(
  # Use p's length (distance from center) for the material
  p length
  1.0 swap - # Invert: 1 at center, 0 at edge
  dup *      # Sharpen the falloff with an exponential curve
  
  # Map the result to a red-hot glow (hue=0)
  0.0 1.0 swap hsv
) glsl material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a squashed sphere with a glowing core.'
    }]
};