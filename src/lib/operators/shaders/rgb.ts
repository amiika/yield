import type { Operator } from '../../types';
import { toGLSL } from './glsl-generator';

export const rgb: Operator = {
    definition: {
        exec: function*(s) {
            const b = s.pop(); const g = s.pop(); const r = s.pop();
            s.push({ type: 'color', expression: `vec3(${toGLSL(r)}, ${toGLSL(g)}, ${toGLSL(b)})` });
        },
        description: 'Creates a static color object from RGB values.',
        effect: '[r g b] -> [color]'
    },
    examples: [{
        code: `2 sphere 255 255 0 rgb material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
    }]
};
