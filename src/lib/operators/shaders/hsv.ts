import type { Operator } from '../../types';
import { toGLSL } from './glsl-generator';

export const hsv: Operator = {
    definition: {
        exec: function*(s) {
            const v = s.pop(); const sat = s.pop(); const h = s.pop();
            s.push({ type: 'color', expression: `hsv2rgb(vec3(${toGLSL(h)}, ${toGLSL(sat)}, ${toGLSL(v)}))` });
        },
        description: 'Creates a color object from HSV (Hue, Saturation, Value) values.',
        effect: '[h s v] -> [color]'
    },
    examples: [{
        code: `0.5 sphere 0.0 1.0 1.0 hsv material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
    }]
};
