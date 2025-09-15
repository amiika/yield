
import type { Operator } from '../../types';

const isAudioQuotation = (v: any): boolean => Array.isArray(v) && v.length > 0 && typeof v[v.length - 1] === 'string';

export const sd: Operator = {
    definition: {
        exec: function*(s) {
            let gateQuotation: any[];
            if (s.length > 0 && isAudioQuotation(s[s.length - 1])) {
                gateQuotation = s.pop() as any[];
            } else {
                // Default to a single-sample impulse for a sharp trigger
                gateQuotation = ['oneshot'];
            }

            // --- Body Component ---
            // A quick pitch drop for the "thwack" of the drum body.
            const pitch_env = [...gateQuotation, 0.001, 0.05, 'ad'];
            const freq = [...pitch_env, 400, 'mul', 180, 'mix'];
            const body_osc = [...freq, 'sine'];

            // A short AD envelope for the body's amplitude.
            const body_amp_env = [...gateQuotation, 0.001, 0.15, 'ad'];
            const body = [...body_osc, ...body_amp_env, 'mul'];

            // --- Noise "Snare" Component ---
            // High-passed white noise to simulate the snares.
            const noise_base = ['noise', 2000, 0.5, 'hpf'];

            // A very short, sharp AD envelope for the noise "snap".
            const noise_amp_env = [...gateQuotation, 0.001, 0.1, 'ad'];
            const noise = [...noise_base, ...noise_amp_env, 'mul'];

            // --- Mix and Final Output ---
            // Mix the body and noise components. The noise is a bit louder to be prominent.
            const body_with_gain = [...body, 0.6, 'mul'];
            const mixed = [body_with_gain, ...noise, 'mix'];
            const final_sound = [...mixed, 0.9, 'mul'];

            s.push(final_sound);
        },
        description: 'Creates a snare drum synth quotation. If a gate signal quotation is on the stack, it is used for triggering. Otherwise, the sound is triggered once immediately.',
        effect: '[L_gate_quotation]? -> [L_quotation]'
    },
    examples: [
        { 
            code: 'sd 0.25 play', 
            expected: []
        },
        { 
            code: '2 impulse sd start', 
            expected: []
        },
        {
            replCode: `
# A common snare pattern using a 5-against-16 Euclidean rhythm
120 tempo
16 impulse        # 16th note clock
5 16 euclidean seq # The euclidean rhythm
sd                # Gate the snare with the sequence
0.8 mul start`,
            async: {
                duration: 500,
                assert: s => s.length === 0,
                assertDescription: "Stack should be empty after starting the audio."
            }
        }
    ],
    keywords: ['drum', 'drumkit', 'snare'],
};
