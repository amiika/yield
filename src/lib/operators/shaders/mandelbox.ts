
import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const mandelbox: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                folding: s.pop(),
                iterations: s.pop(),
                scale: s.pop()
            };
            s.push(createMarchingObject('mandelbox', 'geometry', [], properties));
        },
        description: `Creates a mandelbox geometry.`,
        effect: `[scale iterations folding] -> [sdf]`
    },
    examples: [{
        code: [
            '(t sin 0.5 * 1.5 +) glsl 5.0 2.0 mandelbox',
                '"blue" material',
        'march',
        'render'
        ],
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
        expectedDescription: 'A shader object rendering the geometry.'
    }]
};