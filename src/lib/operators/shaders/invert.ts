import type { Operator } from '../../types';

export const invert: Operator = {
    definition: {
        exec: function*(s) {
            s.push({ op: 'invert', type: 'postEffect', props: {} });
        },
        description: `Creates a invert post-processing effect object.`,
        effect: `[] -> [effect]`
    },
    examples: [{
        code: `1 sphere march  invert post render`,
        assert: s => s[0]?.type === 'shader'
    }]
};
