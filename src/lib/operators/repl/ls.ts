import type { Operator } from '../../types';

export const ls: Operator = {
    definition: {
        exec: function*(s, options) {
            try {
                const keys = Object.keys(localStorage);
                let output: string;
                if (keys.length === 0) {
                    output = 'No saved states.';
                } else {
                    output = 'Saved states:\n' + keys.map(k => `- ${k}`).join('\n');
                }
                
                if (options.onOutput) {
                    options.onOutput(output);
                }

            } catch (e) {
                throw new Error(`Failed to list saved states: ${e.message}`);
            }
        },
        description: 'Lists all saved REPL states from localStorage.',
        effect: '[] -> []'
    },
    examples: [
        {
            code: [
                '"test-ls" save',
                'ls'
            ],
            assert: (s) => s.length === 0,
            expectedDescription: 'Stack should be empty.'
        }
    ]
};
