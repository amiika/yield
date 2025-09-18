
import type { Operator } from '../../types';
import { isMatrix } from '../../utils';

export const sprite: Operator = {
    definition: {
        exec: function*(s) {
            // In the main interpreter, this will now sample the matrix.
            // 1. Pop inputs: matrix first, then uv. Stack order is [uv matrix].
            const matrix = s.pop();
            const uv = s.pop();

            // 2. Validate inputs
            if (!isMatrix(matrix)) {
                s.push(uv, matrix); // Push back and throw
                throw new Error('sprite operator expects a matrix as its second argument.');
            }
            if (!Array.isArray(uv) || uv.length !== 2 || typeof uv[0] !== 'number' || typeof uv[1] !== 'number') {
                s.push(uv, matrix);
                throw new Error('sprite operator expects a 2-element list of numbers for UV coordinates as its first argument.');
            }
            
            const [u, v] = uv;

            // 3. Get matrix dimensions
            const rows = matrix.length;
            if (rows === 0) {
                s.push(0.0); // Empty sprite, return 0
                return;
            }
            const cols = matrix[0].length;
            if (cols === 0) {
                s.push(0.0); // Empty sprite, return 0
                return;
            }

            // 4. Map UVs to indices, handling coordinate system and clamping.
            // UVs are expected to be in [0, 1] range.
            const clampedU = Math.max(0.0, Math.min(1.0, u));
            const clampedV = Math.max(0.0, Math.min(1.0, v));

            // Invert V to match GLSL's texture coordinate system (0,0 is bottom-left in UVs)
            // and our visual expectation (top row of matrix is top of sprite).
            const invertedV = 1.0 - clampedV;

            // Calculate indices. A UV value of 1.0 maps to the last index.
            const colIndex = Math.min(Math.floor(clampedU * cols), cols - 1);
            const rowIndex = Math.min(Math.floor(invertedV * rows), rows - 1);
            
            // 5. Sample and push result
            // Access is row-major: matrix[row][col]
            const value = matrix[rowIndex][colIndex];
            
            // Ensure we push a number, default to 0 if the cell contains something else.
            s.push(typeof value === 'number' ? value : 0.0);
        },
        description: `Renders a 2D sprite from a matrix. In GLSL/image quotations, it's a shader function. In the main interpreter, it samples the matrix directly. The input UV coordinates (a vec2 list) are scaled to fit the sprite's dimensions. Returns a float value sampled from the sprite matrix.`,
        effect: '[uv_vec2 matrix] -> [float]'
    },
    examples: [{
        code: `
# A plane to act as a canvas for the sprite
0 1 0 vec3 0 plane

# Apply it as a material using the 'image' operator
(
  uv # The uv from tri-planar mapping
  # A simple 3x3 smiley face sprite matrix
  (
    (1 0 1)
    (0 0 0)
    (1 1 1)
  )
  sprite      # Returns a float from the matrix
  dup dup vec3  # Make it grayscale
  1.0 vec4    # Add alpha
) image material

march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: `A shader rendering a smiley face sprite on a plane.`
    },
    {
        code: `
# A box to act as a canvas
1 1 1 vec3 box
(
  # Normalize surface coordinates to [0,1] range for UVs
  p xy 0.5 * 0.5 +
  
  # An 4x4 sprite. The rows should appear top-to-bottom.
  (
    (0 1 1 0)
    (1 1 0 1)
    (1 0 0 1)
    (0 1 1 0)
  )
  sprite
  dup dup vec3
) glsl material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: `A shader rendering a box with a pixelated sprite on it.`
    },
    {
        code: `
# Use the 'sprite' operator to render a 2D map from a matrix.
# The matrix values are mapped to colors to represent tile types.
# Note: The matrix must be square (2x2, 3x3, or 4x4) to be used in a shader.
0 1 0 vec3 0 plane
(
  uv # Use the 'uv' from the tri-planar mapping

  # The level data as a 4x4 matrix literal.
  # 1=wall, 2=door, 3=floor.
  (
    (1 1 2 1)
    (1 3 3 1)
    (1 3 3 1)
    (1 1 1 1)
  )

  # Sample the matrix to get a tile ID (1.0, 2.0, or 3.0).
  sprite

  # Map the tile ID to a color. This pattern works around a limitation
  # in the GLSL transpiler by evaluating conditions first, then selecting
  # the appropriate color without nesting stack operators in branches.
  dup 1.5 <   # Is it tile 1 (wall)?
  swap
  dup 2.5 <   # Is it tile 1 or 2 (door)?
  swap pop
  # Stack now has: [is_wall, is_wall_or_door]
  
  (0.6 0.4 0.2 vec3)  # Color for tile 3 (floor)
  (1.0 1.0 0.0 vec3)  # Color for tile 2 (door)
  swap ?              # Select between door or floor
  (0.5 0.5 0.5 vec3)  # Color for tile 1 (wall)
  swap ?              # Select between wall or the previous result
  
  # Add alpha
  1.0 vec4

) image material
march render
`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object that renders a 2D map with different colors for walls, floors, and a door.'
    }]
};
