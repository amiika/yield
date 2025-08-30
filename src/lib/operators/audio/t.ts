import type { Operator } from '../../types';

export const t: Operator = {
    definition: {
        exec: function*(s) {
            // This operator is a placeholder for the transpiler and should not be executed directly.
            // Pushing the string 't' is a safe default for inspection.
            s.push('t');
        },
        description: 'Represents the time variable (sample count) inside a `bytebeat` or `floatbeat` quotation. This operator is only meaningful when used inside a quotation passed to those operators.',
        example: `time [t 255 &] bytebeat`,
        effect: '-> t'
    },
    testCases: [
        { 
            code: 't', 
            expected: ['t']
        },
    ]
};