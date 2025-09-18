
import type { Operator } from '../../types';
import { createMarchingObject, isMatrix } from '../../utils';

export const topology: Operator = {
    definition: {
        exec: function*(s) {
            const indices = s.pop();
            const vertices = s.pop();

            if (!isMatrix(vertices)) {
                throw new Error('topology expects a vertex matrix as the second argument.');
            }
            if (!isMatrix(indices)) {
                throw new Error('topology expects an index matrix as the first argument.');
            }
            
            s.push(createMarchingObject('topology', 'geometry', [], { vertices, indices }));
        },
        description: `Creates a custom SDF geometry from a mesh defined by vertices and indices. It consumes a vertex matrix (Nx3) and an index matrix (Mx3) from the stack. The indices should be 1-based, referring to the rows of the vertex matrix.`,
        effect: `[vertices_matrix indices_matrix] -> [sdf]`
    },
    examples: [
    {
        code: `
# 1. Define the 8 vertices of a cube
(
    (-0.5 -0.5 -0.5) (-0.5 -0.5  0.5) (-0.5  0.5 -0.5) (-0.5  0.5  0.5)
    ( 0.5 -0.5 -0.5) ( 0.5 -0.5  0.5) ( 0.5  0.5 -0.5) ( 0.5  0.5  0.5)
) spread 8 matrows

# 2. Define the 12 triangles (2 per face) using 1-based indices
(
    (1 3 4) (1 4 2)  # -x face
    (8 7 5) (8 5 6)  # +x face
    (1 2 6) (1 6 5)  # -y face
    (4 3 7) (4 7 8)  # +y face
    (3 1 5) (3 5 7)  # -z face
    (2 4 8) (2 8 6)  # +z face
) spread 12 matrows

# 3. Create the topology, rotate it, apply a material, and render
topology
(t 0.5 *) glsl 1 1 0 vec3 rotatesdf
:cyan material
march 
# Add a light for better 3D perception
2 2 4 vec3 :white 0.1 light
render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a rotating cube from its vertex and index data.'
    },
    {
        code: `
# Define vertices for a pyramid
(
    ( 0.0  0.5  0.0) # Top vertex (1)
    (-0.5 -0.5 -0.5) # Base vertex (2)
    ( 0.5 -0.5 -0.5) # Base vertex (3)
    ( 0.5 -0.5  0.5) # Base vertex (4)
    (-0.5 -0.5  0.5) # Base vertex (5)
) spread 5 matrows

# Define indices for the 4 sides and the 2 base triangles
(
    (1 2 3) (1 3 4) (1 4 5) (1 5 2) # Sides
    (2 4 3) (2 5 4)                 # Base
) spread 6 matrows

topology

# Animate rotation and apply a procedural material
(t 0.5 *) glsl 0 1 0 vec3 rotatesdf
(p 5 * t +) glsl cnoise material

march
2 2 4 vec3 :white 0.1 light
render
`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a rotating pyramid with an animated material.'
    },
    {
        code: `
# Define vertices for a 2D triangle on the XY plane
(
    (-0.5 -0.5 0.0)
    ( 0.5 -0.5 0.0)
    ( 0.0  0.5 0.0)
) spread 3 matrows

# Define the single triangle
( (1 2 3) ) spread 1 matrows

# Create the topology and render it as a 2D shape
topology render
`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering a 2D triangle from its topology.'
    }]
};