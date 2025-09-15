
import type { Operator } from '../../types';

const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string';

export const bd: Operator = {
    definition: {
        exec: function*(s) {
            let gateQuotation: any[];
            if (s.length > 0 && isAudioQuotation(s[s.length - 1])) {
                gateQuotation = s.pop() as any[];
            } else {
                gateQuotation = [0.001, 0.4, 0.0, 'gate_env'];
            }

            // Pitch envelope
            const pitch_env = [...gateQuotation, 0.001, 0.1, 'ad'];
            const freq = [...pitch_env, 200, 'mul', 60, 'mix'];
            
            // Oscillator
            const osc = [...freq, 'sine'];
            
            // Amplitude envelope
            const amp_env = [...gateQuotation, 0.001, 0.4, 'ad'];

            // Final sound
            const final_sound = [...osc, ...amp_env, 'mul', 1.0, 'mul'];
            
            s.push(final_sound);
        },
        description: 'Creates a bass drum synth quotation. If a gate signal quotation is on the stack, it is used for triggering. Otherwise, the sound is triggered once immediately.',
        effect: '[L_gate_quotation]? -> [L_quotation]'
    },
    examples: [
        { 
            code: "bd 0.25 play",
            expected: []
        },
        { 
            code: '2 impulse bd start',
            expected: []
        },
        {
            replCode: `
# A classic 3-against-8 Tresillo rhythm for the bass drum
120 tempo
8 impulse         # 8th note clock
3 8 euclidean seq # The euclidean rhythm
bd                # Gate the bass drum with the sequence
0.9 mul start`,
            async: {
                duration: 500,
                assert: s => s.length === 0,
                assertDescription: "Stack should be empty after starting the audio."
            }
        }
    ],
    keywords: ['drum', 'drumkit', 'kick', 'bass drum'],
};