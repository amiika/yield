import type { Operator } from '../../types';
import { toGLSL } from './glsl-generator';

export const wavecolor: Operator = {
    definition: {
        exec: function*(s) {
            const b_freq = s.pop(); const g_freq = s.pop(); const r_freq = s.pop();
            s.push({ type: 'color', expression: `vec3(abs(sin(u_time * ${toGLSL(r_freq)})), abs(sin(u_time * ${toGLSL(g_freq)})), abs(sin(u_time * ${toGLSL(b_freq)})))` });
        },
        description: 'Creates an animated color that oscillates based on time. Takes separate frequencies for R, G, and B channels.',
        effect: '[r_freq g_freq b_freq] -> [color]'
    },
    examples: [{
        code: `0.5 sphere 1 0 0 wavecolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
    }]
};
