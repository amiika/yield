import type { Operator } from '../../types';

export const edge: Operator = {
    definition: {
        exec: function*(s) {
            s.push({ op: 'edge', type: 'postEffect', props: {} });
        },
        description: `Creates a edge post-processing effect object.`,
        effect: `[] -> [effect]`
    },
    examples: [{
        code: `0.2 0.5 vec2 hexprism march edge post render`,
        assert: s => s[0]?.type === 'shader'
    }]
};