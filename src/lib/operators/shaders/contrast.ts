import type { Operator } from '../../types';

export const contrast: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                amount: s.pop()
            };
            s.push({ op: 'contrast', type: 'postEffect', props: properties });
        },
        description: `Creates a contrast post-processing effect object.`,
        effect: `[amount] -> [effect]`
    },
    examples: [{
        code: `1 sphere march 0.5 contrast post render`,
        assert: s => s[0]?.type === 'shader'
    }]
};
