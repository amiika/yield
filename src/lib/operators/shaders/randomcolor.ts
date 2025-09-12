import type { Operator } from '../../types';

export const randomcolor: Operator = {
    definition: {
        exec: function*(s) {
            s.push({ type: 'color', expression: `random_color(p)` });
        },
        description: 'Creates a random color based on the surface position, useful for differentiating objects.',
        effect: '[] -> [color]'
    },
    examples: [{
        code: `0.5 sphere randomcolor material march render`,
        assert: (s) => s.length === 1 && s[0]?.type === 'shader',
    }]
};
