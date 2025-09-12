
import type { Operator } from '../../types';

export const pulse: Operator = {
    definition: {
        exec: function*(s) {
            const duty = s.pop();
            const freqOrModulator = s.pop();
            
            if (Array.isArray(freqOrModulator)) {
                if (freqOrModulator.length === 0) {
                    s.push(['mul', ['pulse', 0, duty], 0]); // Default to silence
                    return;
                }

                const firstEl = freqOrModulator[0];
                if (typeof firstEl === 'string') {
                    // It's an audio graph (modulator) for frequency
                    s.push(['pulse', freqOrModulator, duty]);
                } else {
                    // It's a list of frequencies for a chord
                    const graphs = freqOrModulator.map(f => ['pulse', f, duty]);
                    const mixedGraph = graphs.slice(1).reduce((acc, current) => ['mix', acc, current], graphs[0]);
                    s.push(mixedGraph);
                }
            } else {
                // It's a static frequency (number)
                s.push(['pulse', freqOrModulator, duty]);
            }
        },
        description: 'Creates a pulse wave oscillator node. The frequency can be a number, a list of numbers (for a chord), or an audio graph for frequency modulation (FM). The duty cycle can also be a number or an audio graph.',
        effect: '[F_freq|L_freqs|L_modulator F_duty|L_modulator] -> [L_graph]'
    },
    examples: [
        { code: '440 0.25 pulse', expected: [['pulse', 440, 0.25]] },
        { 
            code: '(220 330) 0.5 pulse', 
            assert: (s) => s.length === 1 && s[0][0] === 'mix' && s[0][1][1] === 220 && s[0][2][1] === 330,
            expectedDescription: 'A mixed audio graph for a chord.'
        }
    ]
};
