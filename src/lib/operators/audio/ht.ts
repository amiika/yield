
import type { Operator } from '../../types';

const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string';

export const ht: Operator = {
    definition: {
        exec: function*(s) {
            let gateQuotation: any[];
            if (s.length > 0 && isAudioQuotation(s[s.length - 1])) {
                gateQuotation = s.pop() as any[];
            } else {
                gateQuotation = [0.001, 0.3, 0.0, 'gate_env'];
            }

            const base_freq = 250;
            const pitch_env = [...gateQuotation, 0.001, 0.08, 'ad'];
            const freq = [...pitch_env, base_freq * 1.5, 'mul', base_freq, 'mix'];
            const osc = [...freq, 'sine'];
            const amp_env = [...gateQuotation, 0.001, 0.3, 'ad'];
            const final_sound = [...osc, ...amp_env, 'mul', 0.9, 'mul'];
            
            s.push(final_sound);
        },
        description: 'Creates a high tom synth quotation. If a gate signal quotation is on the stack, it is used for triggering. Otherwise, the sound is triggered once immediately.',
        effect: '[L_gate_quotation]? -> [L_quotation]'
    },
    examples: [
        { 
            code: 'ht 0.25 play',
            expected: []
        },
        { 
            code: '2 impulse ht start',
            expected: []
        },
        {
            replCode: `
# A high tom pattern using a 4-against-15 Euclidean rhythm for a polyrhythmic feel
120 tempo
15 impulse        # A clock based on 15 steps
4 15 euclidean seq # The euclidean rhythm
ht                # Gate the high tom with the sequence
0.9 mul start`,
            async: {
                duration: 50,
                assert: s => s.length === 0,
                assertDescription: "Stack should be empty after starting the audio."
            }
        }
    ],
    keywords: ['drum', 'drumkit', 'tom', 'high tom'],
};