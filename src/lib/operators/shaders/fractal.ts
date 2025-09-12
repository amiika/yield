
import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const fractal: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                scale: s.pop(),
                iterations: s.pop(),
            };
            s.push(createMarchingObject('fractal', 'geometry', [], properties));
        },
        description: `Creates a Mandelbox-style fractal geometry based on box and sphere folding.`,
        effect: `[iterations scale] -> [sdf]`
    },
    examples: [{
        code: `8 2.2 fractal
"red" material
march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the fractal geometry.'
    }]
};
