
import type { Operator } from '../../types';

export const impulse: Operator = {
    definition: {
        exec: function*(s) {
            const freq = s.pop();
            s.push(['impulse', freq]);
        },
        description: 'Creates a trigger impulse oscillator node at a given frequency (Hz). Note: For safety, a raw impulse played directly will be silent. To hear it, you must apply a gain (e.g., `8 impulse 0.5 mul play`).',
        effect: '[F_freq] -> [L_graph]'
    },
    examples: [
        { code: "8 impulse 0.5 mul play", expected: [['mul', ['impulse', 8], 0.5]] },
        { code: "8 impulse", expected: [['impulse', 8]] },
    ]
};
