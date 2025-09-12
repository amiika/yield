import type { Operator } from '../../types';

export const brightness: Operator = {
    definition: {
        exec: function*(s) {
            const properties = {
                amount: s.pop()
            };
            s.push({ op: 'brightness', type: 'postEffect', props: properties });
        },
        description: `Creates a brightness post-processing effect object.`,
        effect: `[amount] -> [effect]`
    },
    examples: [{
        code: `1 sphere march 0.5 brightness post render`,
        assert: s => s[0]?.type === 'shader'
    }]
};
