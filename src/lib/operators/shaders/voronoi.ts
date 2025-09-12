import type { Operator } from '../../types';
import { toGLSL } from './glsl-generator';

export const voronoi: Operator = {
    definition: {
        exec: function*(s) {
            const input = s.pop();
            const glslInput = toGLSL(input);
            if (!glslInput) throw new Error('voronoi expects an input value (e.g., a vec2, vec3, or a glsl_expression object)');
            // voronoi().z is the distance to the nearest point. We can visualize this.
            s.push({ type: 'color', expression: `vec3(voronoi(${glslInput}).z)` });
        },
        description: 'Creates a color from Voronoi noise. The input should be a vec2, vec3, or a `glsl_expression`, which can be constructed from GLSL variables like `p` (hit position) and `t` (time) for animation, using the `glsl` combinator.',
        effect: '[vec] -> [color]'
    },
    examples: [{
      code: "2 4 4 vec3 0.1 roundbox (p xy 5 * t +) glsl voronoi material march render",
        assert: s => s[0]?.type === 'shader',
        expectedDescription: 'A shader object with a roundbox textured with animated Voronoi noise.'
    }]
};