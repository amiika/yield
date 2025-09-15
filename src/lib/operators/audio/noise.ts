

import type { Operator } from '../../types';

export const noise: Operator = {
    definition: {
        exec: function*(s) {
            s.push(['noise']);
        },
        description: 'Creates a white noise generator quotation.',
        effect: '[] -> [L_quotation]'
    },
    examples: [
        { 
            code: "noise 0.5 mul 0.5 play",
            expected: []
        },
        { 
            code: "noise",
            expected: [['noise']]
        },
    ]
};
