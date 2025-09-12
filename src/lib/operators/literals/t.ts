
import type { Operator } from '../../types';

export const t: Operator = {
    definition: {
        exec: function*(s) {
            // This operator is a placeholder for the transpiler and should not be executed directly.
            // Pushing the string 't' is a safe default for inspection.
            s.push('t');
        },
        description: 'A placeholder for the time variable. Inside a `bytebeat` or `floatbeat` quotation, it represents the integer sample count. Inside a `glsl` quotation, it represents the floating-point `u_time` uniform for animation.',
        effect: '-> t'
    },
    examples: [
        { 
            code: 't', 
            expected: ['t']
        },
    ]
};
