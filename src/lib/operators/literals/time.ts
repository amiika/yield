
import type { Operator } from '../../types';

export const time: Operator = {
    definition: {
        exec: function*(s) {
            // This is a no-op. 'time'/'t' is a special variable inside bytebeat/floatbeat/glsl quotations.
            // This definition exists primarily for documentation purposes.
        },
        description: "A special variable representing time (shorthand: `t`). Inside `bytebeat` or `floatbeat` quotations, `t` is an integer counter. Inside `glsl` quotations, `t` is a float representing seconds (`u_time`). In normal execution, this operator is a no-op.",
        effect: '[] -> []'
    },
    examples: [
        {
            code: `time`,
            expected: []
        },
        {
            code: `(t 42 *) 8000 bytebeat`,
            assert: s => Array.isArray(s[0]) && s[0][2] === 'bytebeat',
            expectedDescription: 'A bytebeat audio graph using the time variable `t`.'
        }
    ]
};
