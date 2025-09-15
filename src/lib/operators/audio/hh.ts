
import type { Operator } from '../../types';

const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string';

export const hh: Operator = {
    definition: {
        exec: function*(s) {
            let gateQuotation: any[];
            if (s.length > 0 && isAudioQuotation(s[s.length - 1])) {
                gateQuotation = s.pop() as any[];
            } else {
                gateQuotation = [0.001, 0.05, 0.0, 'gate_env'];
            }

            const decay = 0.05;
            const cutoff = 8000;
            const gain = 0.5;

            const amp_env = [...gateQuotation, 0.001, decay, 'ad'];
            const filtered_noise = ['noise', cutoff, 0.1, 'hpf'];
            const final_sound = [...filtered_noise, ...amp_env, 'mul', gain, 'mul'];

            s.push(final_sound);
        },
        description: 'Creates a closed hi-hat synth quotation. If a gate signal quotation is on the stack, it is used for triggering. Otherwise, the sound is triggered once immediately.',
        effect: '[L_gate_quotation]? -> [L_quotation]'
    },
    examples: [
        {
            code: 'hh 0.25 play',
            expected: []
        },
        {
            code: '8 impulse hh start',
            expected: []
        },
        {
            replCode: `
# A syncopated hi-hat pattern using a 7-against-16 Euclidean rhythm
120 tempo
16 impulse        # 16th note clock
7 16 euclidean seq # The euclidean rhythm
hh                # Gate the hi-hat with the sequence
0.5 mul start`,
            async: {
                duration: 500,
                assert: s => s.length === 0,
                assertDescription: "Stack should be empty after starting the audio."
            }
        }
    ],
    keywords: ['drum', 'drumkit', 'hi-hat', 'cymbal'],
};