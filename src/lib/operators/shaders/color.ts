
import type { Operator } from '../../types';
import { toGLSL } from './glsl-generator';

export const color: Operator = {
    definition: {
        exec: function*(s) {
            const val = s.pop();
            const glslExpr = toGLSL(val);
            if (!glslExpr) throw new Error('color operator expects a color name (string/symbol) or a vec3.');
            s.push({ type: 'color', expression: glslExpr });
        },
        description: 'Creates a color object from a preset name (e.g., "red", :blue) or a vec3 list.',
        effect: '[name|vec3] -> [color]'
    },
    examples: [
        {
            code: `"red" color`,
            assert: (s) => s.length === 1 && s[0]?.type === 'color' && s[0].expression.includes('vec3(1.0, 0.2, 0.2)'),
            expectedDescription: 'A red color object'
        },
        {
            code: `1 0 1 vec3 color`,
            assert: (s) => s.length === 1 && s[0]?.type === 'color' && s[0].expression === 'vec3(1.0, 0.0, 1.0)',
            expectedDescription: 'A magenta color object'
        }
    ]
};
