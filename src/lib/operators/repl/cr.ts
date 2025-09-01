import type { Operator } from '../../types';

export const cr: Operator = {
    definition: {
        exec: function*(s, options) {
            if (options.onOutput) {
                options.onOutput('\n');
            } else {
                console.log('\n'); // Fallback
            }
        },
        description: 'Outputs a newline to the REPL.',
        effect: '[] -> []'
    },
    // FIX: Renamed 'testCases' to 'examples' for consistency.
    examples: [
        { code: 'cr', expected: [] }
    ]
};