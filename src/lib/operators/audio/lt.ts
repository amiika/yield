
import type { Operator } from '../../types';

const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string';

export const lt: Operator = {
    definition: {
        exec: function*(s) {
            let gateQuotation: any[];
            if (s.length > 0 && isAudioQuotation(s[s.length - 1])) {
                gateQuotation = s.pop() as any[];
            } else {
                gateQuotation = [0.001, 0.3, 0.0, 'gate_env'];
            }

            const base_freq = 120;
            const pitch_env = [...gateQuotation, 0.001, 0.08, 'ad'];
            const freq = [...pitch_env, base_freq * 1.5, 'mul', base_freq, 'mix'];
            const osc = [...freq, 'sine'];
            const amp_env = [...gateQuotation, 0.001, 0.3, 'ad'];
            const final_sound = [...osc, ...amp_env, 'mul', 0.9, 'mul'];
            
            s.push(final_sound);
        },
        description: 'Creates a low tom synth quotation. If a gate signal quotation is on the stack, it is used for triggering. Otherwise, the sound is triggered once immediately.',
        effect: '[L_gate_quotation]? -> [L_quotation]'
    },
    examples: [
        { 
            code: 'lt 0.25 play',
            expected: []
        },
        { 
            code: '2 impulse lt start',
            expected: []
        },
        {
            replCode: `
# A sparse low tom pattern using a 2-against-16 Euclidean rhythm
120 tempo
16 impulse        # 16th note clock
2 16 euclidean seq # The euclidean rhythm
lt                # Gate the low tom with the sequence
0.9 mul start`,
            async: {
                duration: 50,
                assert: s => s.length === 0,
                assertDescription: "Stack should be empty after starting the audio."
            }
        }
    ],
    keywords: ['drum', 'drumkit', 'tom', 'low tom'],
};