


import type { Operator } from '../../types';

export const oneshot: Operator = {
    definition: {
        exec: function*(s) {
            s.push(['oneshot']);
        },
        description: 'Creates a single trigger signal quotation. When played, it produces a single spike of 1.0 on the first sample, then 0.0 thereafter. This is the standard way to trigger one-shot sounds for instruments that have their own internal envelopes (like `bd`, `sd`, `e-piano`, etc.).',
        effect: '[] -> [L_quotation]'
    },
    examples: [
        {
            replCode: "oneshot bd 0.25 play",
            async: {
                duration: 500,
                assert: s => s.length === 0,
                assertDescription: "Stack should be empty after playing the one-shot sound."
            }
        },
        {
            code: "oneshot",
            expected: [['oneshot']]
        },
    ]
};